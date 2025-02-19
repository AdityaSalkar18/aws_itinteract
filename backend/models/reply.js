const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    link: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Link', // Reference to the Link model
        required: true,
    },

   

    linkuid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Link', // Reference to the Link model
        required: true,
    },
  
    linksd: {
        type: String,
        required: true,
       
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (task owner)
        required: true,
    },


    upid:{
        type: String,
        required: true,

    },

    name: {
        type: String,
        required: true,
    },

    reply:{
        type: String,
        required: true, 
         

    },
  
   
    date: {
        type: Date,
        default: Date.now, // Automatically set to the current date/time
    },
});

module.exports = mongoose.model('Reply', replySchema);
