const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')
const fetchAllNotes = async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.id })
        res.json(notes)
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal Error Occured'
        })
    }
}
const addNote = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { title, description, tag } = req.body
        const note = await Notes.create({ title: title, description: description, tag: tag, user: req.id })
        res.status(200).json(note)
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal Error Occured'
        })
    }
}
const updateNote = async (req, res) => {
    const { title, description, tag } = req.body
    const newData = {};
    if (title) { newData.title = title }
    if (description) { newData.description = description }
    if (tag) { newData.tag = tag }
    try {
        let note = await Notes.findById(req.params.id)
        if (!note)
            res.status(404).send('Note not found')
        if (note.user.toString() !== req.id)
            res.status(401).send('Not allowed')
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newData }, { new: true })
        return res.status(200).json(note)
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}
const deleteNote = async (req, res) => {
    try{
        let note = await Notes.findById(req.params.id)
        if (!note)
            return res.status(404).send('Note not found')
        if (note.user.toString() !== req.id)
            return res.status(401).send('Not allowed')
        note = await Notes.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: 'successfully deleted the note' })
    }
    catch(error){
        return res.status(500).json({message:'Internal server error'})
    }
}
module.exports = {
    fetchAllNotes,
    addNote,
    updateNote,
    deleteNote
}