const express = require('express')
const router = express.Router()
const companyController = require('../controllers/company.controller')

router.route('/')
	.get(companyController.list)
	.post(companyController.add)

router.route('/:companyId')
	.put(companyController.edit)
	.delete(companyController.deleteById)
	
module.exports = router
