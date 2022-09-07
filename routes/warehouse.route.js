const express = require('express')
const router = express.Router()
const warehouseController = require('../controllers/warehouse.controller')

router.route('/')
	.get(warehouseController.list)
	.post(warehouseController.add)

router.route('/:warehouseId')
	.put(warehouseController.edit)
	.delete(warehouseController.deleteById)
	
module.exports = router
