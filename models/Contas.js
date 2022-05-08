const mongoose = require('mongoose')

const Conta = mongoose.model('Conta', {
    name: String,
    user: String,
    value: Number,
    type: String,
    paid_out: Boolean,
    month: Number,
    year: Number
})

module.exports = Conta