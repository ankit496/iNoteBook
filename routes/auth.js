const express = require('express')
const router = express.Router()
const { create, verify, getUser } = require('../controllers/userController')
const { body, validationResult } = require('express-validator')
const fetchuser = require('../middleware/fetchUser')
const User = require('../models/User')
router.post('/signup',
    [
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid Email').isEmail(),
        body('password', 'Password atleast must be 5 characters long').isLength({ min: 5 }),
    ]
    , create)
router.post('/signin',
    [
        body('email', 'Enter a valid Email').isEmail(),
        body('password', 'Password atleast must be 5 characters long').isLength({ min: 5 }),
    ]
    , verify)
router.post('/getUser', fetchuser, getUser)
module.exports = router