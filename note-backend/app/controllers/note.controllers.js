const { Note, User, Trash } = require("../models");

module.exports = {
  index: async (req, res) => {
    try {
      const query = { userId: req.user.id, isDeleted: false };
      const note = await Note.find(query);

      if (!note) return res.status(404).send("not found");

      return res
        .status(200)
        .json({ message: "Note date fetched successfully", data: note });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  store: async (req, res) => {
    try {
      let note = new Note({ ...req.body, userId: req.user.id });

      await note.save();
      return res.status(201).json(note);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  show: async (req, res) => {
    try {
      const id = req.params.id;
      const userId = req.user.id;
      const note = await Note.find({ _id: id, userId: userId });

      if (!note) return res.status(404).send("not found");

      return res.status(200).json(note);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;

      const note = await Note.findByIdAndUpdate(id, req.body, { new: true });

      if (!note) return res.status(404).send("not found");

      return res.status(200).json(note);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const userId = req.user.id;

      const user = await User.findById(userId);
      const note = await Note.findById(id);

      if (!note) return res.status(404).json({ message: "Note not found" });
      if (!user) return res.status(404).json({ message: "User not found" });

      const trash = await new Trash({ noteId: id, userId: userId }).save();

      const response = await Note.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      );

      return res.status(200).json({
        message: "Note deleted successfully",
        data: { response, trash },
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  pinNote: async (req, res) => {
    try {
      const id = req.params.id;
      const note = await Note.findById(id);

      if (!note) return res.status(404).json({ message: "not found" });

      const updatedNote = await Note.findByIdAndUpdate(
        id,
        { isPinned: req.body.isPinned },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Note pinned successful", data: updatedNote });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  },

  getPinnedNotes: async (req, res) => {
    try {
      const notes = await Note.find({ isPinned: true });

      if (!notes) return res.status(404).json({ message: "not found" });

      return res
        .status(200)
        .json({ message: "Notes fetched successfully", data: notes });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  },
};
