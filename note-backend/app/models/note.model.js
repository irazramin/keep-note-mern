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
    }

});

const Note = mongoose.model('Note', noteSchema);


module.exports.Note = Note;