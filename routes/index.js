const routesCompanies = require('./companies');
const routesUsers = require('./users');
const routeSwagger = require('./swagger');


const express = require("express");
const router = express.Router();


router.use('/companies', routesCompanies);
router.use('/users', routesUsers);
router.use('/', routeSwagger);

module.exports = router;