const mongoose = require('mongoose');

const useSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const User = mongoose.model('User', useSchema);

module.exports = User;