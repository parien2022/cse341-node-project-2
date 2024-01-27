const express = require("express");
const companiesController = require('../controller/companies');

const router = express.Router();

router.get('/', companiesController.getAll);
router.get('/:id', companiesController.getSingle);
router.post('/', companiesController.createCompany);
router.put('/:id', companiesController.updateCompany);
router.delete('/:id', companiesController.deleteCompany);

module.exports = router;