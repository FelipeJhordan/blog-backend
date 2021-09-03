const router = require('express').Router()
const AuthController = require('../controllers/AuthController')
const authRoute = require('./routes-auth')
const postRoute = require('./routes-post')

router.get("/", function(req,res) {
    res.send({ret: "Funcionando"})
})


router.use("/", authRoute)
router.use("/", postRoute)

module.exports = router