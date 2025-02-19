// const router = require("express").Router();
// const { User, validate } = require("../models/user");
// const bcrypt = require("bcrypt");
// const Profile = require("../models/profile");


// router.post("/", async (req, res) => {
// 	try {
// 		const { error } = validate(req.body);
// 		if (error)
// 			return res.status(400).send({ message: error.details[0].message });

// 		const user = await User.findOne({ email: req.body.email });
// 		if (user)
// 			return res
// 				.status(409)
// 				.send({ message: "User with given email already Exist!" });

// 		const salt = await bcrypt.genSalt(Number(process.env.SALT));
// 		const hashPassword = await bcrypt.hash(req.body.password, salt);

// 		const new_user = await new User({ ...req.body, password: hashPassword }).save();
// 		await Profile.create({ user: new_user._id,email: new_user.email,name:new_user.userName});
		
		
		

// 		res.status(201).send({ message: "User created successfully" });
// 	} catch (error) {
// 		res.status(500).send({ message: "Internal Server Error" });
// 	}
// });

// module.exports = router;




// const router = require("express").Router();
// const { User, validate } = require("../models/user");
// const bcrypt = require("bcrypt");
// const Profile = require("../models/profile");

// router.post("/", async (req, res) => {
// 	try {
// 		// Validate the input
// 		const { error } = validate(req.body);
// 		if (error) return res.status(400).send({ message: error.details[0].message });

// 		// Check if email ends with @vcet.edu.in
// 		const emailRegex = /^[a-zA-Z0-9._%+-]+@vcet\.edu\.in$/;
// 		if (!emailRegex.test(req.body.email)) {
// 			return res.status(400).send({ message: "Only vcet users are allowed." });
// 		}

// 		// Check if user already exists
// 		const user = await User.findOne({ email: req.body.email });
// 		if (user) {
// 			return res.status(409).send({ message: "User with given email already exists!" });
// 		}

// 		// Hash password and create user
// 		const salt = await bcrypt.genSalt(Number(process.env.SALT));
// 		const hashPassword = await bcrypt.hash(req.body.password, salt);

// 		const new_user = await new User({ ...req.body, password: hashPassword }).save();
// 		await Profile.create({
// 			user: new_user._id,
// 			email: new_user.email,
// 			name: new_user.userName,
// 		});

// 		res.status(201).send({ message: "User created successfully" });
// 	} catch (error) {
// 		res.status(500).send({ message: "Internal Server Error" });
// 	}
// });

// module.exports = router;





// const router = require("express").Router();
// const { User, validate } = require("../models/user");
// const bcrypt = require("bcrypt");
// const Profile = require("../models/profile");
// const rateLimit = require("express-rate-limit");

// // Rate limiter for registration endpoint: Limits requests to 5 per 15 minutes
// const registerLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // Limit each IP to 5 requests per window
//   message: { message: "Too many registration attempts, please try again later." },
// });

// // Apply rate limiter to the registration route
// router.post("/", registerLimiter, async (req, res) => {
//   try {
//     // Validate the input using Joi schema
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send({ message: error.details[0].message });

//     // Check if email ends with @vcet.edu.in
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@vcet\.edu\.in$/;
//     if (!emailRegex.test(req.body.email)) {
//       return res.status(400).send({ message: "Only VCET users are allowed." });
//     }

//     // Check if user already exists
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       return res.status(409).send({ message: "User with given email already exists!" });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(Number(process.env.SALT));
//     const hashPassword = await bcrypt.hash(req.body.password, salt);

//     // Create the new user
//     const newUser = new User({ ...req.body, password: hashPassword });
//     await newUser.save();

//     // Create a profile for the new user
//     await Profile.create({
//       user: newUser._id,
//       email: newUser.email,
//       name: newUser.userName,
//     });

//     res.status(201).send({ message: "User created successfully" });
//   } catch (error) {
//     console.error("Error during user registration:", error);  // Log the error for debugging
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// });

// module.exports = router;





const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const Profile = require("../models/profile");
const rateLimit = require("express-rate-limit");
const fs = require("fs");
const csv = require("csv-parser");

// Rate limiter for registration endpoint: Limits requests to 5 per 15 minutes
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per window
  message: { message: "Too many registration attempts, please try again later." },
});


// Verify OTP

const otpFile = "otps.csv"; // CSV file containing OTPs

router.post("/verify-otp", (req, res) => {
  const { otp } = req.body;

  if (!fs.existsSync(otpFile)) {
    return res.status(400).json({ success: false, message: "OTP file not found." });
  }

  let isValid = false;
  fs.createReadStream(otpFile)
    .pipe(csv())
    .on("data", (row) => {
      if (row.otp === otp) {
        isValid = true;
      }
    })
    .on("end", () => {
      if (isValid) {
        res.json({ success: true, message: "OTP Verified" });
      } else {
        res.status(400).json({ success: false, message: "Invalid OTP" });
      }
    });
});


router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		const new_user = await new User({ ...req.body, password: hashPassword }).save();
		await Profile.create({ user: new_user._id,email: new_user.email,name:new_user.userName,act:new_user.userAct});
		
		
		

		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// Apply rate limiter to the registration route
router.post("/student/", registerLimiter, async (req, res) => {
  try {
    // Validate the input using Joi schema
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    // Check if email ends with @vcet.edu.in
    const emailRegex = /^[a-zA-Z0-9._%+-]+@vcet\.edu\.in$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).send({ message: "Only VCET users are allowed." });
    }

    // Check if email exists in the allowed list (from CSV file)
    const allowedEmails = await getAllowedEmailsFromCSV();
    if (!allowedEmails.includes(req.body.email)) {
      return res.status(400).send({ message: "Email not allowed. Only VCET users are permitted." });
    }

    // Check if user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).send({ message: "User with given email already exists!" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create the new user
    const newUser = new User({ ...req.body, password: hashPassword });
    await newUser.save();

    // Create a profile for the new user
    await Profile.create({
      user: newUser._id,
      email: newUser.email,
      name: newUser.userName,
      act:  newUser.userAct
    });

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during user registration:", error);  // Log the error for debugging
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Function to read allowed emails from the CSV file
const getAllowedEmailsFromCSV = () => {
  return new Promise((resolve, reject) => {
    const allowedEmails = [];
    fs.createReadStream("vcet_emails.csv") // Path to your CSV file
      .pipe(csv()) // Parse the CSV file
      .on("data", (data) => {
        // Assuming CSV has a column named 'email'
        allowedEmails.push(data.email);
      })
      .on("end", () => {
        resolve(allowedEmails);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

module.exports = router;


