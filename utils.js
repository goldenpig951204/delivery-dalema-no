function randomPassword() {
    const key = 'abcdefghijklmnopqrstuvwxyz1234567890'
    let password = ''
    for (let i = 0; i < 8; i++) {
        password += key.charAt(Math.floor(Math.random() * key.length))
    }

    return password
}

module.exports = {
    randomPassword
}