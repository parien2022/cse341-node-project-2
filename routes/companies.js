const express = require("express");
const companiesController = require('../controller/companies');
const validation = require('../validation/validate');

const router = express.Router();

router.get('/', companiesController.getAll);
router.get('/:id', companiesController.getSingle);
router.post('/', validation.validateCompany, companiesController.createCompany);
router.put('/:id', validation.validateCompany, companiesController.updateCompany);
router.delete('/:id', companiesController.deleteCompany);

module.exports = router;