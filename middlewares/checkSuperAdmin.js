function checkSuperAdmin(req, res, next) {
    if (req.user.userType == 'superadmin') {
        next()
    }
    else {
        res.json({ result: 0, msg: 'Authorization failed'})
    }
}
module.exports = checkSuperAdmin