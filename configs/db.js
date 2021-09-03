
module.exports = {
    database: process.env.BD_DATABASE,
    username: process.env.BD_USER,
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    dialect: process.env.BD_DIALECT,
    password: process.env.BD_PASSWORD,
    logging: (process.env.BD_LOGGING == 1) ? true : false 
}