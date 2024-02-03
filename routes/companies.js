const express = require('express')
const companiesController = require('../controller/companies')
const validation = require('../middleware/validate')
const isAuthenticated = require('../middleware/authenticate')

const router = express.Router()

router.get('/', companiesController.getAll)
router.get('/:id', companiesController.getSingle)
router.post(
  '/',
  isAuthenticated.isAuthenticated,
  validation.validateCompany,
  companiesController.createCompany,
)
router.put(
  '/:id',
  isAuthenticated.isAuthenticated,
  validation.validateCompany,
  companiesController.updateCompany,
)
router.delete(
  '/:id',
  isAuthenticated.isAuthenticated,
  companiesController.deleteCompany,
)

module.exports = router
