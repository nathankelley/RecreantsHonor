const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.get('/', userController.getAll);
router.get('/:_id', userController.getUser);
router.post('/', userController.create);
router.put('/:_id', userController.updateUser);
router.delete('/:_id', userController.deleteUser);

module.exports = router;