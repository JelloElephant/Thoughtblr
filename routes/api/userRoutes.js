const router = require('express').Router()
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
} = require('../../controllers/userController')

// Get all users
router.route('/').get(getUsers).post(createUser)

// Find single user and populate thoughts & friend data
router.route('/:userId').get(getSingleUser)

// Create new User route
router.route('/')

// Update a user by Id
router.route('/')

// Delete a user by Id
router.route('/')