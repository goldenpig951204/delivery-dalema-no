const express = require('express')
const router = express.Router()
const countryController = require('../controllers/country.controller')

router.route('/')
	.get(countryController.list)
	.post(countryController.add)

router.route('/:countryId')
	.put(countryController.edit)
	.delete(countryController.deleteById)
	
module.exports = router
