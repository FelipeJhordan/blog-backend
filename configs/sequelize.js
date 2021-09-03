const { Sequelize } = require('sequelize')
const Log = require('../logs/log')
const db  = require('./db')

const database = {Sequelize}

try {
    database.sequelize = new Sequelize( {
    database: db.database,
    username: db.username,
    password: db.password,
    host: db.host,
    port: db.port,
    dialect: db.dialect,
    logging: db.logging
} )
    Log.info("ConnectionBD Success!")
} catch (err) {
    Log.error('ConnectionBD Error '+ err)
}

module.exports = database  