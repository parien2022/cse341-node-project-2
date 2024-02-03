const express = require('express')
const usersController = require('../controller/users')
const validation = require('../middleware/validate')
const authenticate = require('../middleware/authenticate')

const router = express.Router()

router.get('/', usersController.getAll)
router.get('/:id', usersController.getSingle)
router.post('/', authenticate.isAuthenticated, validation.validateUser, usersController.createUser)
router.put('/:id', authenticate.isAuthenticated, validation.validateUser, usersController.updateUser)
router.delete('/:id', authenticate.isAuthenticated, usersController.deleteUser)

module.exports = router
