const router = require('express').Router()
const {
    getUsers,
    getSingleUser,
    createUser,
    upUser,
    deleteUser,
    addFriend,
    delFriend,
} = require('../../controllers/userController')

// Get all users
router.route('/').get(getUsers).post(createUser)

// Find single user and populate thoughts & friend data
router.route('/:userId').get(getSingleUser).put(upUser).delete(deleteUser)

// Create new User route
router.route('/:userId/friends/:friendId').post(addFriend).delete(delFriend)

module.exports = router