// const express = require('express');
// const router = express.Router();
// const validateToken = require('../middlewares/validateToken');

// const Link = require('../models/link'); 
// const Profile = require('../models/profile'); 

// // Route to add a comment to an update
// router.post('/', validateToken, async (req, res) => {
//     try {
//         const userId = req.user._id; // Getting the authenticated user's ID
//         const { tid, link,desc } = req.body; // Getting the update ID and comment message

        
//         if (!tid || !link) {
//             return res.status(400).json({ error: 'Task ID and link are required' });
//         }

       
//         const profile = await Profile.findOne({ user: userId });

//         if (!profile) {
//             return res.status(404).json({ message: 'Profile not found' });
//         }

       
//         const newLink = new Link({
//             user: userId,
//             name: profile.name, 
//             tid, 
//             link,
//             desc,
//         });

        
//         await newLink.save();
//         res.status(201).json(newLink);

//     } catch (err) {
//         console.error(err); // Log the error for debugging
//         res.status(500).json({ error: 'Error adding comment' });
//     }
// });

// //Get all link
// router.get('/',async (req,res) => {
//     try {
//         const link = await Link.find();
//         res.status(200).json(link);
        
//     } catch (error) {
//         res.status(500).json({error: 'Could not fetch link'});   
        
//     }
// })

// //Get all link using ID
// router.get('/:tid',async (req,res) => {
//     try {
//         const {tid} = req.params;
//         const link = await Link.findById(tid);

//         if(!link){
//             return res.status(404).json({error: 'Link not found'});
//         }

//         res.status(200).json(link);
        
//     } catch (error) {
//         res.status(500).json({error: 'Could not fetch link'});   
        
//     }
// })


// module.exports = router;



const express = require('express');
const router = express.Router();
const validateToken = require('../middlewares/validateToken');
const Link = require('../models/link');
const Profile = require('../models/profile');

// Route to add a link to a task
router.post('/', validateToken, async (req, res) => {
    try {
        const userId = req.user._id; // Getting the authenticated user's ID
        const { tid,tsd, link, desc } = req.body; // Extracting the task ID, link, and description from the request body

        // Validate required fields
        if (!tid || !tsd || !link) {
            return res.status(400).json({ error: 'Task ID and link are required' });
        }

        // Find the profile of the authenticated user
        const profile = await Profile.findOne({ user: userId });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Create a new link
        const newLink = new Link({
            user: userId,
            upid:profile.id,
            name: profile.name,
            task: tid, // Use `task` instead of `tid` for clarity if that matches your schema
            tasksd: tsd,
            link,
            desc,
        });

        // Save the link to the database
        await newLink.save();
        res.status(201).json(newLink);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Error adding link' });
    }
});




router.get('/',async (req,res) => {
    try {
        const link = await Link.find();
        res.status(200).json(link);
        
    } catch (error) {
        res.status(500).json({error: 'Could not fetch link'});   
        
    }
})

// Route to get links by task ID
router.get('/:task', async (req, res) => {
    try {
        const { task } = req.params;

        // Find links associated with the specified task ID
        const links = await Link.find({task })

        if (!links  || links.length === 0) {
            return res.status(404).json({ error: 'No links found for the specified task' });
        }

        res.status(200).json(links);
    } catch (error) {
       
        res.status(500).json({ error: 'Could not fetch links' });
    }
});

module.exports = router;
