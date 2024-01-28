const express = require("express");
const usersController = require('../controller/users');
const validation = require('../validation/validate');

const router = express.Router();

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);
router.post('/', validation.validateUser, usersController.createUser);
router.put('/:id', validation.validateUser, usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;