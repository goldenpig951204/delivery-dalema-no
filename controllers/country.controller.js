const countryModel = require('../models/country.model')
async function list(req, res) {
    const { name, page, perPage } = req.query
    let list = await countryModel.find({ name: new RegExp(name, 'i') }).limit(+perPage).skip((page - 1) * perPage)
    let total = await countryModel.count({ name: new RegExp(name, 'i') })
    res.json({ result: 1, data: { list, total }})
}

async function add(req, res) {
    const { name } = req.body

    if (!name) {
        res.json({ result: 0, msg: 'Name is required'})
    }
    else {
        let country  = new countryModel()
        country.name = name
        await country.save()
        res.json({ result: 1 })
    }
}

async function edit(req, res) {
    if (!req.body.name) {
        res.json({ result: 0, msg: 'Name is required'})
    }
    else {
        await countryModel.updateOne({ _id: req.params.countryId }, { name: req.body.name })
        res.json({ result: 1 })
    }
}

async function deleteById(req, res) {
    await countryModel.deleteOne({ _id: req.params.countryId })
    res.json({ result: 1 })
}

module.exports = {
    list,
    add,
    edit,
    deleteById
}