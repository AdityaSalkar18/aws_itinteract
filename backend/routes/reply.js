const express = require('express');
const router = express.Router();
const validateToken = require('../middlewares/validateToken');
const Reply = require('../models/reply');
const Profile = require('../models/profile');




// Route to add a reply to a link
router.post('/', validateToken, async (req, res) => {
    try {
        const userId = req.user._id; // Authenticated user ID
        const { lid,lsd,luid, reply } = req.body; // Extract link ID and reply content from request body

        // Validate required fields
        if (!lid || !lsd || !luid || !reply) {
            return res.status(400).json({ error: 'Link ID and reply content are required' });
        }

        // Find the profile of the authenticated user
        const profile = await Profile.findOne({ user: userId });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Create a new reply
        const newReply = new Reply({
            user: userId,
            upid: profile.id, // Profile ID
            name: profile.name, // User name
            link: lid, // Link ID to which this reply belongs
            linksd:lsd,
            linkuid:luid,
            reply, // Reply content
        });

        // Save the new reply to the database
        await newReply.save();
        res.status(201).json(newReply);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Error adding reply' });
    }
}); 




router.get('/',async (req,res) => {
    try {
        const reply = await Reply.find();
        res.status(200).json(reply);
        
    } catch (error) {
        res.status(500).json({error: 'Could not fetch link'});   
        
    }
})





// Get all reply for the authenticated user
router.get('/myreply',validateToken,  async (req, res) => {
    try {
        const userId = req.user._id;

        const profile = await Profile.findOne({ user: userId });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
 
       
        
        const replies = await Reply.find({ linkuid : profile._id});
        
        res.status(200).json(replies);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch reply' });
    }
});






// Fetch replies for a specific link based on linkId
router.get('/:linkuid', async (req, res) => {
    try {
        const { linkuid } = req.params; 

      
        const replies = await Reply.find({ linkuid });
        

        
        if (!replies || replies.length === 0) {
            return res.status(404).json({ error: 'No replies found for this link' });
        }

        
        res.status(200).json(replies);

    } catch (error) {
        
        res.status(500).json({ error: 'Could not fetch replies', details: error.message });
    }
});






module.exports = router;