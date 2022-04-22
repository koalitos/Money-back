const router = require('express').Router()
const Conta = require('../models/Contas')
const cors = require('cors')

router.use(cors())


router.post('/', async (req, res) => {

    const { name, value, paid_out, month, year } = req.body

    if (!name) {
        return res.status(422).json({ error: 'Nome não foi enviado!' })   
    }

    const conta = {
        name,
        value,
        paid_out,
        month,
        year
    }

    try {
        await Conta.create(conta)

        res.status(201).json({ message: 'Registro Criado!' })
    }

    catch (error) {
        res.status(500).json({ error: error })
    }
})


router.get('/', async (req, res) => {
    try {
        
        if (req.query.name) {
            const regs = await Conta.findOne({ name: req.query.name })

            return res.status(200).json(regs)
        }

        if (req.query.mes && req.query.ano) {
            const regs = await Conta.find({ mes: req.query.mes, ano: req.query.ano })

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

    const { name, value, paid_out } = req.body

    const conta = {
        name,
        value,
        paid_out,
        month,
        year
    }

    try {
        const updateValue = await Conta.updateOne({ _id: id }, conta)

        res.status(200).json({ data: conta })
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