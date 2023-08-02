const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    delReaction,
} = require('../../controllers/thoughtController');

// All thoughts
router.route('/').get(getThoughts).post(createThought);

// Thoughts by Id
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// Create reaction
router.route('/:thoughtId/reactions').post(addReaction);

// Delete reaction by Id
router.route('/:thoughtId/reactions/:reactionId').delete(delReaction);

module.exports = router;
