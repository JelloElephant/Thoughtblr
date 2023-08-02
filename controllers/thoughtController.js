const { Thought, User} = require('../models')

const thoughtController = {
    getThoughts(req, res) {
        Thought.find({})
        .populate({
            path: "thoughts",
            strictPopulate: false,
        })
        .sort({ _id: -1 })
        .then((thoughtData) => res.json(thoughtData))
        .catch((err) => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    getSingleThought({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        .populate({
            path: "thoughts",
            strictPopulate: false,
        })
        .then((oneThought) => {
            if (!oneThought) {
                res.status(404).json({ message: "No thought with that Id found!" })
                return
            }
            res.json(oneThought)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },

    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            console.log(_id)
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            )
        })
        .then((newThought) => {
            if (!newThought) {
                res.status(404).json({ message: "No user found with matching Id" })
                return
            }
            res.json(newThought)
        })
        .catch((err) => res.json(err))
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
            new: true,
            runValidators: true
        })
        .then((upThought) => {
            if (!upThought) {
                res.status(404).json({ message: "No thought found with matching Id" })
                return
            }
            res.json(upThought)
        })
        .catch((err) => res.status(500).json(err))
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then((delThought) => {
            if (!delThought) {
                res.status(404).json({ message: "No thought with matching Id found" })
            }
            User.findOneAndUpdate(
                { username: delThought.username },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            )
            .then((userThought) => {
                if (!userThought) {
                    res.status(404).json({ message: "No user found with matching Id" })
                    return
                }
                res.json(userThought)
            })
            .catch((err) => res.json(err))
        })
    },

    addReaction({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body} },
            { new: true, runValidators: true }
        )
        .then((newReact) => {
            if (!newReact) {
                res.status(404).json({ message: "No user found with matching Id" })
                return
            }
            res.json(newReact)
        })
        .catch((err) => res.json(err))
    },

    delReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: {reactionId: params.reactionId } } },
            { new: true }
        )
        .then((delReact) => res.json(delReact))
        .catch((err) => res.json(err))
    },
}

module.exports = thoughtController