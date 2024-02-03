const express = require('express')
const companiesController = require('../controller/companies')
const validation = require('../middleware/validate')
const authenticate = require('../middleware/authenticate')

const router = express.Router()

router.get('/', companiesController.getAll)
router.get('/:id', companiesController.getSingle)
router.post(
  '/',
  authenticate.isAuthenticated,
  validation.validateCompany,
  companiesController.createCompany,
)
router.put(
  '/:id',
  authenticate.isAuthenticated,
  validation.validateCompany,
  companiesController.updateCompany,
)
router.delete(
  '/:id',
  authenticate.isAuthenticated,
  companiesController.deleteCompany,
)

module.exports = router
