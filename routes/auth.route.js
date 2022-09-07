const express = require('express')
const passport = require('passport')
const router = express.Router()
const authController = require('../controllers/auth.controller')

router.route('/login')
	.post(authController.login)

router.route('/password')
	.post(passport.authenticate('jwt', { session: false }), authController.changePassword)

module.exports = router
