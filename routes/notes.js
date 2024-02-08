const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchUser')
const { fetchAllNotes, addNote ,updateNote,deleteNote} = require('../controllers/notesController')
const { body, validationResult } = require('express-validator')
router.get('/fetchallnotes', fetchuser, fetchAllNotes)
router.post('/addnote',
    fetchuser,
    [
        body('title', 'Enter a valid title').isLength({ min: 3 }),
        body('description', 'description must be atleast 5 character').isLength({ min: 5 })
    ],
    addNote)
router.put('/update/:id',fetchuser,updateNote)
router.delete('/deletenote/:id',fetchuser,deleteNote)
module.exports = router