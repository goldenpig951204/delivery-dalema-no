const express = require('express')
const passport = require('passport')

const authRoute =  require('./auth.route')
const userRoute = require('./user.route')
const countryRoute = require('./country.route')
const companyRoute = require('./company.route')
const warehouseRoute = require('./warehouse.route')
const slotRoute = require('./slot.route')
const calendarRoute = require('./calendar.route')
const checkSuperAdmin = require('../middlewares/checkSuperAdmin')

const router = express.Router()

router.use('/auth', authRoute)
router.use('/user', passport.authenticate('jwt', { session: false }), checkSuperAdmin, userRoute)
router.use('/country', passport.authenticate('jwt', { session: false }), checkSuperAdmin, countryRoute)
router.use('/company', passport.authenticate('jwt', { session: false }), checkSuperAdmin, companyRoute)
router.use('/warehouse', passport.authenticate('jwt', { session: false }), checkSuperAdmin, warehouseRoute)
router.use('/slot', passport.authenticate('jwt', { session: false }), checkSuperAdmin, slotRoute)
router.use('/calendar', passport.authenticate('jwt', { session: false }), calendarRoute)

module.exports = router
