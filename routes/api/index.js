const router = require('express').Router();
const thought_Routes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

router.use('/thoughts', thought_Routes);
router.use('/users', userRoutes);

module.exports = router