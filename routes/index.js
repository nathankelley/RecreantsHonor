const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/undead', require('./undead'));
router.use('/user', require('./user'));

module.exports = router;