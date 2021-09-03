const User = require("../models/User.js")
const Role = require("../models/Role.js")
const stringUtil = require('../utils/stringUtils')
const { compareCryptString } = require("../utils/stringUtils")
const jwt = require('jsonwebtoken')
const Log = require('../logs/log')
module.exports = {

    async login(req, res) {
        const user = req.body
        try {
            const userBD = await User.findOne({where: {username: user.username}})
            if(!userBD) {
                return res.status(400).json({message:"Usuário Inválido"})
            } else {
                if((await compareCryptString(user.password, userBD.password))) {
                    let token = jwt.sign({ id: userBD.id}, process.env.KEY_JWT, { expiresIn: 7200})
                      delete userBD.password
                      res.json({user:userBD, token: token})
                } else {
                    res.status(400).json({message: "Senha Inválida"})
                }
            }
        } catch(e) {
                    res.status(500).send(e)
        }
    },

    async checkToken(req, res, next) {
        const token = req.get('Authorization')
        if (!token) {
            return res.status(401).json({ message: 'Token not found'})
        }
        jwt.verify(token, process.env.KEY_JWT, (err, decoded) => {
            if(err || !decoded) {
                return res.status(401).json({message: 'Wrong token. Authentication error'})
             }
             next()
        })
    },
    async generateNewToken(req, res ) {
        try {
            const token = req.get('Authorization')
            await jwt.verify(token, process.env.KEY_JWT, async (err, decoded) => {
            const id = decoded.id
            const userBD = await User.findByPk(id)
                
            let token = await jwt.sign({ id: userBD.id}, process.env.KEY_JWT, { expiresIn: 7200})

            delete userBD.password
            res.json({ token: token, user: userBD})
        })
        }catch(err) {
            res.status(500)
        }
    },
    async register(req, res) {
        let user = req.body
        role = await Role.findOrCreate(
            {
                where: { desc: "USER"}
            }
        )
        user.password = await stringUtil.cryptString(user.password)
        try {
            let usernameExists = await User.findOne(
                {
                    where: {username: user.username}
                }
            )
            let emailExists = await User.findOne(
                {
                    where: { email: user.email }
                }
            )

            if(usernameExists) res.status(400).json({message: "Username já existe"})
            if(emailExists) res.status(400).json({message: "Email já existe"})

            await User.create({...user, role: role[0].id})
            res.json({message:"Usuário Cadastrado com sucesso"})
        } catch(err) {
            res.status(500).json({message: "Erro ao salvar o usuário"})
        }
    }
}

