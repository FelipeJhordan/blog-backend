
require('dotenv').config()
const express = require('express')
const {sequelize} = require('./configs/sequelize')
const routes = require('./routes/index')
const log = require('./logs/log')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(routes)

// sequelize.sync({ force: true }).then( () => {log.info("Schema Created")})

app.listen( process.env.PORT || 3333, () => {
    log.info("Server is work!")
})