const express = require('express')
const router = express.Router()
const slotController = require('../controllers/slot.controller')

router.route('/')
	.get(slotController.list)
	.post(slotController.add)

router.route('/:slotId')
	.put(slotController.edit)
	.delete(slotController.deleteById)
	
module.exports = router
