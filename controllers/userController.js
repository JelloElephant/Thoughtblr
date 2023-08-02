const { User } = require('../models')

module.exports = {
    getUsers(req, res) {
        User.find({})
        .sort({ _id: -1 })
        .then((usersData) => res.json(usersData))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    getSingleUser({ params }, res) {
        User.findOne({ _id: params.userId })
        .select("-__v")
        .populate({
            path: "friends",
        })
        .populate({
            path: "thoughts"
        })
        .then((userData) => {
            if(!userData) {
                res.status(404).json({ message: "No user found by this ID" })
                return
            }
            res.json(userData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    createUser({ body }, res) {
        User.create(body)
        .then((newUser) => res.json(newUser))
        .catch((err) => res.status(500).json(err))
    },

    upUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId }, body, {
            new: true,
            runValidators: true,
        })
        .then((upedUser) => {
            if(!upedUser) {
                res.status(404).json({ message: "No user found with matching Id" })
                return
            }
            res.json(upedUser)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.userId })
        .then((delUser) => {
            if (!delUser) {
                res.status(404).json({ message: "No user found with matching Id" })
                return
            }
            res.json(delUser)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
    },

    addFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true}
        )
        .then((friendData) => {
            if (!friendData) {
                res.status(404).json({ message: "No user found with matching Id" })
                return
            }
            res.json(friendData)
        })
        .catch((err) => res.json(err))
    },
    
    delFriend({ params }, res) {
        User.findOneAndDelete(
            { _id: params.userId },
            { $pull: { friends: params.friendId} },
            { new: true }
        )
        .then((delFri) => res.status(delFri))
        .catch((err) => res.json(err))
    },

}