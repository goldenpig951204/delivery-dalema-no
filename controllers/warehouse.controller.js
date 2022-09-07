const warehouseModel = require('../models/warehouse.model')
const countryModel = require('../models/country.model')

async function list(req, res) {
    const { name, country, page, perPage } = req.query

    let query = { name: new RegExp(name, 'i')}
    if (country != -1) query['country'] = country

    let list = await warehouseModel.find(query).populate('country').limit(+perPage).skip((page - 1) * perPage)
    let total = await warehouseModel.count(query)
    let countries = await countryModel.find()
    res.json({ result: 1, data: { list, total, countries }})
}

async function add(req, res) {
    const { name, country } = req.body

    if (!name || !country) {
        res.json({ result: 0, msg: 'Name and Country is required'})
    }
    else {
        let warehouse  = new warehouseModel()
        warehouse.name = name
        warehouse.country = country
        await warehouse.save()
        res.json({ result: 1 })
    }
}

async function edit(req, res) {
    const { name, country } = req.body

    if (!name || !country) {
        res.json({ result: 0, msg: 'Name and Country is required'})
    }
    else {
        await warehouseModel.updateOne({ _id: req.params.warehouseId }, { name, country })
        res.json({ result: 1 })
    }
}

async function deleteById(req, res) {
    await warehouseModel.deleteOne({ _id: req.params.warehouseId })
    res.json({ result: 1 })
}

module.exports = {
    list,
    add,
    edit,
    deleteById
}