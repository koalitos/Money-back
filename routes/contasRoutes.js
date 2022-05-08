const router = require('express').Router()
const Conta = require('../models/Contas')
const cors = require('cors')

router.use(cors())


router.post('/', async (req, res) => {
    const { name, user, value, type, paid_out, month, year } = req.body
    const dateNow = new Date()

    if (!name) {
        res.status(422).json({ error: 'Nome não foi enviado!' })  
        
        return 
    }

    const conta = {
        name,
        user,
        value,
        type,
        paid_out: false,
        month: dateNow.getMonth(),
        year: dateNow.getFullYear()
    }

    try {
        await Conta.create(conta)

        res.status(201).json({ message: 'Registro Criado' })
    }

    catch (error) {
        res.status(500).json({ error: error })

        return
    }
})


router.get('/', async (req, res) => {
    try {
        
        if (req.query.name) {
            const regs = await Conta.findOne({ name: req.query.name })

            return res.status(200).json(regs)
        }

        if (req.query.user && req.query.mes && req.query.ano) {
            const regs = await Conta.find({ user: req.query.user, mes: req.query.mes, ano: req.query.ano })

            return res.status(200).json(regs)
        }

        const regs = await Conta.find()
        res.status(200).json(regs)
    }

    catch (error) {
        res.status(500).json({ error: error })
    }
})


router.get('/:id', async (req, res) => {
    const id = req.params.name
    
    res.header("Access-Control-Allow-Origin", "*");

    try {
        const regs = await Conta.findOne({ _id: id })

        res.status(200).json(regs)
    }

    catch (error) {
        res.status(500).json({ error: 'Registro não encontrado' })
    }
})


router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const dateNow = new Date()

    const { name, user, value, type, paid_out, month, year } = req.body

    const conta = {
        name,
        user,
        value,
        paid_out,
        type,
        month: dateNow.getMonth(),
        year: dateNow.getFullYear()
    }

    try {
        const updateValue = await Conta.updateOne({ _id: id }, conta)

        res.status(200).json(conta)
    }

    catch (error) {
        res.status(500).json({ error: 'Registro não atualizado' })
    }
})


router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const deleteValue = await Conta.deleteOne({ _id: id })

        res.status(200).json({ message: 'Registro removido com sucesso' })
    }

    catch (error) {
        res.status(500).json({ error: 'Registro não deletado' })
    }
})


module.exports = router