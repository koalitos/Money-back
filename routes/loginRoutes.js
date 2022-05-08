const router = require('express').Router()
const Login = require('../models/Login')
const cors = require('cors')
const md5 = require('md5');

router.use(cors())


router.post('/register', async (req, res) => {
    const { user, pass, name, email } = req.body

    if (!name || !user || !pass) {
        res.status(422).json({ error: 'Campos Obrigatorios' })  
        
        return 
    }

    const login = {
        user,
        pass,
        name,
        email,
    }

    
    try {
        await Login.create(login)

        res.status(201).json({ message: 'Registro Criado' })
    }

    catch (error) {
        res.status(500).json({ error: error })

        return
    }
})


router.get('/', async (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

    if (!req.query.user || !req.query.pass) {
        return
    }

    try {
        const regs = await Login.findOne({ user: req.query.user, pass: req.query.pass})

        if (!regs) {
            return res.status(500).json({ error: 'Registro não encontrado' })
        } 

        res.status(200).json(regs)
    }

    catch (error) {
        res.status(500).json({ error: 'Registro não encontrado' })
    }
})


// router.patch('/:id', async (req, res) => {
//     const id = req.params.id
//     const dateNow = new Date()

//     const { name, value, paid_out, month, year } = req.body

//     const conta = {
//         name,
//         value,
//         paid_out,
//         month: dateNow.getMonth(),
//         year: dateNow.getFullYear()
//     }

//     try {
//         const updateValue = await Conta.updateOne({ _id: id }, conta)

//         res.status(200).json(conta)
//     }

//     catch (error) {
//         res.status(500).json({ error: 'Registro não atualizado' })
//     }
// })


module.exports = router