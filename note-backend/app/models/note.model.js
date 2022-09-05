const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 100,
        required: true
    },
    description: {
        type: String,
    },
    color: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }

});

const Note = mongoose.model('Note', noteSchema);


module.exports.Note = Note;