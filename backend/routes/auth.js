// const router = require("express").Router();
// const { User } = require("../models/user");
// const bcrypt = require("bcrypt");
// const Joi = require("joi");


// router.post("/", async (req, res) => {
// 	try {
// 		const { error } = validate(req.body);
// 		if (error)
// 			return res.status(400).send({ message: error.details[0].message });

// 		const user = await User.findOne({ email: req.body.email });
// 		if (!user)
// 			return res.status(401).send({ message: "Invalid Email or Password" });

// 		const validPassword = await bcrypt.compare(
// 			req.body.password,
// 			user.password
// 		);
// 		if (!validPassword)
// 			return res.status(401).send({ message: "Invalid Email or Password" });

// 		const token = user.generateAuthToken();
// 		res.status(200).send({ data: token, message: "logged in successfully" });
// 	} catch (error) {
// 		res.status(500).send({ message: "Internal Server Error" });
// 	}
// });

// const validate = (data) => {
// 	const schema = Joi.object({
// 		email: Joi.string().email().required().label("Email"),
// 		password: Joi.string().required().label("Password"),
// 	});
// 	return schema.validate(data);
// };

// module.exports = router;




const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const rateLimit = require("express-rate-limit");

// Rate limiter middleware: Limits requests to 5 per 10 minutes
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Limit each IP to 5 requests per window
  message: { message: "Too many login attempts, please try again later." },
});

// Apply rate limiter to the login route
router.post("/", loginLimiter, async (req, res) => {
  try {
    // Validate request body
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    // Check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send({ message: "Invalid Email or Password" });

    // Validate the password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

    // Generate authentication token
    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Logged in successfully" });

  } catch (error) {
    console.error("Login Error: ", error);  // Log the error for debugging
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Validate request body using Joi
const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
