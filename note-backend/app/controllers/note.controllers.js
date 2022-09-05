const { Note } = require('../models/note.model');

module.exports = {

    index: async(req,res) => {

        const note = await Note.find({});

        if(!note) return res.status(404).send('not found');

        res.send(note);

    },

    store: async(req,res) => {

        let note = new Note(req.body);

        await note.save();

        res.send(note);

    },

    show: async(req,res) => {

        const id = req.params.id;

        const note = await Note.find({_id: id});

        if(!note) return res.status(404).send('not found');

        res.send(note);

    },

    update: async(req,res) => {

        const id = req.params.id;

        const note = await Note.updateOne({_id: id}, req.body, {new: true});

        if(!note) return res.status(404).send('not found');

        res.send(note);

    },

    delete: async(req,res) => {

        const id = req.params.id;

        const note = await Note.deleteOne({_id: id});

        if(!note) return res.status(404).send('not found');

        res.send(note);

    },

}