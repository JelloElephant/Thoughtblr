const router = require('express').Router()
const { route } = require('.')
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,

} = require('../../controllers/thoughtController')

router.route('/').get(getThoughts)

// Get single thought by id
router.route('/:thoughtId').get(getSingleThought)

// create new thought w/ id associated to users `thoughts`
router.route('').post(createThought)

// Update thought by id

// Delete thought by id
router.route('').delete(deleteThought)