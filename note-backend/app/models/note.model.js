const mongoose = require("mongoose");


const collaboratorsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
        required: false,
    },
    backgroundColor: {
      type: String,
      required: false,
    },
    backgroundImage: {
      type: String,
      required: false,
    },
    collaborators: {
      type: [collaboratorsSchema],
    },
    pinned: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

module.exports.Note = Note;
