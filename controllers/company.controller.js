const companyModel = require('../models/company.model')
async function list(req, res) {
    const { name, page, perPage } = req.query
    let list = await companyModel.find({ name: new RegExp(name, 'i') }).limit(+perPage).skip((page - 1) * perPage)
    let total = await companyModel.count({ name: new RegExp(name, 'i') })
    res.json({ result: 1, data: { list, total }})
}

async function add(req, res) {
    const { name } = req.body

    if (!name) {
        res.json({ result: 0, msg: 'Name is required'})
    }
    else {
        let company  = new companyModel()
        company.name = name
        await company.save()
        res.json({ result: 1 })
    }
}

async function edit(req, res) {
    if (!req.body.name) {
        res.json({ result: 0, msg: 'Name is required'})
    }
    else {
        await companyModel.updateOne({ _id: req.params.companyId }, { name: req.body.name })
        res.json({ result: 1 })
    }
}

async function deleteById(req, res) {
    await companyModel.deleteOne({ _id: req.params.companyId })
    res.json({ result: 1 })
}

module.exports = {
    list,
    add,
    edit,
    deleteById
}