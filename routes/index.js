const express = require('express');
const openCors = require("../middleware/openCors");

const router = express.Router();

router.use(openCors);
router.use('/', require('./swagger'));
router.use('/undead', require('./undead'))

module.exports = router;