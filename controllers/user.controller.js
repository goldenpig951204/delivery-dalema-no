const userModel = require('../models/user.model')
const companyModel = require('../models/company.model')
const config = require('../config')
const nodemailer = require('nodemailer')
const utils = require('../utils')

async function list(req, res) {
    const { email, username, company, page, perPage } = req.query

    let query = { 
        email: new RegExp(email, 'i'),
        username: new RegExp(username, 'i')
    }

    if (company != -1) query['company'] = company

    let list = await userModel.find(query).populate('company').limit(+perPage).skip((page - 1) * perPage)
    let total = await userModel.count(query)
    let companies = await companyModel.find()
    res.json({ result: 1, data: { list, total, companies }})
}

async function add(req, res) {
    const { email, username, userType, company } = req.body

    let user  = new userModel()

    user.email = email
    user.username = username
    user.userType = userType

    const companyIds = company.map(c => c._id)
    user.company = companyIds
    
    const password = utils.randomPassword()
    user.password = password

    let newUser = await user.save()

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.emailUser,
            pass: config.emailPassword
        }
    })

    transporter.sendMail({
        from: config.emailUser,
        to: newUser.email,
        subject: 'Account Created!',
        text: 'Hi! There, Your Account is created. Password is ' + password
    }, (err, info) => {
        if (err) {
            res.json({ result: 0, msg: 'Email Error' })
        }
        else {
            res.json({ result: 1 })
        }
    })
}

async function edit(req, res) {
    let { email, username, userType, company } = req.body
    company = company.map(c => c._id)
    await userModel.updateOne({ _id: req.params.userId }, { email, username, userType, company })
    res.json({ result: 1 })
}

async function deleteById(req, res) {
    await userModel.deleteOne({ _id: req.params.userId })
    res.json({ result: 1 })
}

async function resetPassword(req, res) {
	let user = await userModel.findById(req.params.userId)

    const password = utils.randomPassword()
	user.password = password
	await user.save()

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.emailUser,
            pass: config.emailPassword
        }
    })

    transporter.sendMail({
        from: config.emailUser,
        to: user.email,
        subject: 'Password reset',
        text: 'Hi! There, Your password has been reset. New password is ' + password
    }, (err, info) => {
        if (err) {
            res.json({ result: 0, msg: 'Email Error' })
        }
        else {
            res.json({ result: 1 })
        }
    })
}

module.exports = {
    list,
    add,
    edit,
    deleteById,
    resetPassword
}