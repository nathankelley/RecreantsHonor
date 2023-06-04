const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/undead', require('./undead'));
//router.use('/recreants', require('./recreants'));

module.exports = router;