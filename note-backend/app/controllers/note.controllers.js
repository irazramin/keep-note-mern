const { Note } = require("../models/note.model");

module.exports = {
  index: async (req, res) => {
    const note = await Note.find({});

    if (!note) return res.status(404).send("not found");

    return res.status(200).json(note);
  },

  store: async (req, res) => {
    try {
      req.body.createdAt = new Date();

      let note = new Note(req.body);

      await note.save();
      return res.status(201).json(note);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  show: async (req, res) => {
    try {
      const id = req.params.id;

      const note = await Note.find({ _id: id });

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

      const note = await Note.deleteOne({ _id: id });

      if (!note) return res.status(404).send("not found");

      return res.status(200).json(note);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
