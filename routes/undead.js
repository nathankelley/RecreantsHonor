const express = require('express');
const router = express.Router();

const undeadController = require('../controllers/undead');

router.get('/', undeadController.getAll);
router.get('/:_id', undeadController.getUndead);
router.post('/', undeadController.create);
router.put('/:_id', undeadController.updateUndead);
router.delete('/:_id', undeadController.deleteUndead);

module.exports = router;