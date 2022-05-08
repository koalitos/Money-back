const mongoose = require('mongoose')

const Login = mongoose.model('Login', {
    user: String,
    pass: String,
    name: String,
    email: String,
})

module.exports = Login