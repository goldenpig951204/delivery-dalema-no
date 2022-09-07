const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

router.route('/')
	.get(userController.list)
	.post(userController.add)

router.route('/:userId')
	.put(userController.edit)
	.delete(userController.deleteById)

router.route('/password/:userId')
	.post(userController.resetPassword)
	
module.exports = router
