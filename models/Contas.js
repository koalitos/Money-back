const mongoose = require('mongoose')

const Conta = mongoose.model('Conta', {
    name: String,
    value: Number,
    paid_out: Boolean,
    mes: Number,
    ano: Number
})

module.exports = Conta