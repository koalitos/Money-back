require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

app.use(cors())

app.use(cors(), function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    next();
});


// json
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// api rotas modular
const contasRoutes = require('./routes/contasRoutes')

app.use('/conta', contasRoutes)

// rota inicial
app.get('/', (req, res) => {

    res.json({message: 'teste ok'})

})

// banco connect
const DB_USER = process.env.DB_USER
const DB_PASS = encodeURIComponent(process.env.DB_PASS)

mongoose
    .connect(
        //sua url do mongoDb
        `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.0kogm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
        )
        .then(() => {
            console.log('Conectado')
            app.listen(8888)
        })
        .catch(() => {
            console.error('Offline')
        })