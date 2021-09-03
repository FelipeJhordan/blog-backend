const Post = require("../models/Post")
const { delAccentsRegex } = require("../utils/stringUtils")
const Sequelize = require("sequelize")
const CommentController = require("./CommentController")
module.exports = {
   async getAll(req, res) {
        try {
            console.log("entro")
            res.send(await Post.findAll())
        } catch (e) {
            res.status(500).json({message: ""})
        }
    },
   async getOne(req, res) {
        const url = req.params.titleUrl
        try {
            console.log("dsadsa")

            const post = await Post.findOne({where: { titleUrl: {[Sequelize.Op.like]: url}}})
            if(post) {
                if(post.allowComments) {
                    const comments = await CommentController.getCommentsAllByPost(post.id)
                    console.log(comments)
                    res.json({comments, post})
                } else {
                    res.json({post})
                }
            } else {
                res.status(404).json({message: "Not Found"})
            }
        } catch(e) {
            console.log(e)
            res.status(500).json({message: "Erro no servidor"})
        }
    },
    async create(req, res) {
        try {
            const post = req.body
            const titleUrl = delAccentsRegex(post.title).toLowerCase()
            await Post.findOrCreate({
                 defaults: {
                    title: post.title, 
                    subtitle: post.subtitle, 
                    text: post.text, 
                    author: post.author,
                    titleUrl: titleUrl
                 },
                where: {titleUrl: titleUrl}
            })
            res.json({message: "Postagem criada com sucesso"})
        } catch(e) {
            res.status(400).json({message:"Não tem usuário criado"})
        }
    },
    async delete(req, res) {
        const {id} = req.body
        try {
            const rowsDeleted = await Post.destroy(
                {
                    where: {
                        id: id
                    }
                }
            )
            if(rowsDeleted == 0) {
                 res.status(404).json({message: "Error"})
            }
            res.json( {rowsDeleted: rowsDeleted} )
        } catch(e) {
            res.status(500).json({message: "Error"})
        }
    },
    async update(req, res) {
        const post = req.body
        try {
            const postUpdate = await Post.update(
                {text: post.text, title: post.title, allowComments: post.allowComments, subtitle: post.subtitle},
                {
                    where: {
                        id: post.id
                    }
                }
            )
            res.json( {postUpdate: postUpdate[0]} )
        } catch(e) {
            res.status.json({message: "Falha ao atualizar"})
        }
    },
}