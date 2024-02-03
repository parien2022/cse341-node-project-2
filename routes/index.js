const routesCompanies = require('./companies')
const routesUsers = require('./users')
const routeSwagger = require('./swagger')

const express = require('express')
const passport = require('passport')
const router = express.Router()

router.use('/companies', routesCompanies)
router.use('/users', routesUsers)
router.use('/', routeSwagger)

router.get(
  '/login',
  passport.authenticate('github', (req, res) => {}),
)

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})

module.exports = router
