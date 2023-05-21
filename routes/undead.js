const express = require('express');
const router = express.Router();

const undeadController = require('../controllers/undead');

router.get('/', undeadController.getAll);

router.get('/:id', undeadController.getSingle);

router.post('/', undeadController.writeUndead);

router.put('/:id', undeadController.updateUndead);

router.delete('/:id', undeadController.deleteUndead);

module.exports = router;