const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task', // Reference to the Task model
        required: true,
    },

    
    tasksd:{
        type: String,
        required: true,
    },

    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
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
    link: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now, // Automatically set to the current date/time
    },
});

module.exports = mongoose.model('Link', linkSchema);
