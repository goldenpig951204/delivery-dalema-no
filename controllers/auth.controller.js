const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const config = require('../config')

async function login(req, res) {
	const { email, password } = req.body

	let user = await userModel.findOne({ email }).populate('company')
	if (user && (await user.matchPassword(password))) {
		let payload = {id: user.id};
		let token = jwt.sign(payload, config.secretKey);
		res.json({ result: 1, data: { token, user }})
	}
	else {
		res.json({ result: 0, msg: 'Email or Password incorrect!'})
	}
}

async function changePassword(req, res) {
	const { password, confirmPassword } = req.body
	if (!password || !confirmPassword || password != confirmPassword) {
		res.json({ result: 0, msg: 'Input new password and confirm correctly.' })
	}
	else {
		let user = await userModel.findById(req.user._id)
		user.password = password
		await user.save()
		res.json({ result: 1 })
	}
}

module.exports = {
	login,
	changePassword
}