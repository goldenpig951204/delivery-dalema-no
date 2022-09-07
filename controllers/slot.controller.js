const slotModel = require('../models/slot.model')
const warehouseModel = require('../models/warehouse.model')

async function list(req, res) {
    const { warehouse, page, perPage } = req.query
    let list = await slotModel.find({ warehouse }).limit(+perPage).skip((page - 1) * perPage)
    let total = await slotModel.count({ warehouse })
    let slotWarehouse = await warehouseModel.findById(warehouse)
    res.json({ result: 1, data: { list, total, warehouse: slotWarehouse }})
}

async function add(req, res) {
    const { warehouse, fromDate, toDate, fromTime, toTime, loadUnit, capacity } = req.body

    let slot  = new slotModel()

    slot.warehouse = warehouse
    slot.fromDate = fromDate
    slot.toDate = toDate
    slot.fromTime = fromTime
    slot.toTime = toTime
    slot.loadUnit = loadUnit
    slot.capacity = capacity

    let newSlot = await slot.save()
    res.json({ result: 1 })
}

async function edit(req, res) {
    const { fromDate, toDate, fromTime, toTime, loadUnit, capacity } = req.body

    await slotModel.updateOne({ _id: req.params.slotId }, { fromDate, toDate, fromTime, toTime, loadUnit, capacity })
    res.json({ result: 1 })
}

async function deleteById(req, res) {
    await slotModel.deleteOne({ _id: req.params.slotId })
    res.json({ result: 1 })
}

module.exports = {
    list,
    add,
    edit,
    deleteById
}