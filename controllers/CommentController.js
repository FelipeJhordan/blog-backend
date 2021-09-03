const CommentUser = require("../models/CommentUser")
const CommentPost = require("../models/CommentPost")
const User = require("../models/User")


module.exports = {
    async getCommentsAllByPost(idPost) {
        return {
            commentsPost: await this.joinComments(idPost)
        }
    },
    async joinComments(idPost) {
        const commentsPost = await this.getCommentsPost(idPost)
        const commentsUser = await this.getCommentsUser(idPost)
        if( !commentsPost  && !commentsUser) {
        }
        else if (!commentsUser) return commentsPost
        else {
                const commentsJoined = commentsPost.map( (commentPost) => {
                    commentPost.commentsByUser = new Array()
                    commentsUser.forEach( (commentUser) => {
                        if(commentUser.comment.target === commentPost.comment.author) {
                            commentPost.commentsByUser.push(commentUser)
                        }
                    })
                    return commentPost
              })
              return commentsJoined
        }
     },
    async getCommentsPost(idPost) {
        const comments = await CommentPost.findAll({where: {
            target: idPost
        }})
        const commentsAndAuthors = await this.returnCommentsWithAuthors(comments)
        return commentsAndAuthors
    },

    async getCommentsUser(idPost) {
        const comments = await CommentUser.findAll({where: {
            target: idPost
        }})
        const commentsAndAuthors = await this.returnCommentsWithAuthors(comments)
        return commentsAndAuthors
    },

    async returnCommentsWithAuthors(comments) {
        const commentsAndAuthors = await Promise.all(comments.map(async (comment) => {
            let user = await User.findByPk(comment.author)
            return  { user , comment}
        })
       )
       return commentsAndAuthors
    },
    async createComment(req, res) {
        try {
            const { targetIsPost, comment} = req.body
            if(targetIsPost) {
                await CommentPost.create({author: comment.author, text: comment.text, target: comment.target})
            }  else {
                await CommentUser.create({
                    author: comment.author, 
                    text: comment.text, 
                    target: comment.target, 
                    post: comment.post}
                    )
            }
            res.json({ message: "Comentário Criado com sucesso"})
        } catch(e) {
            res.status(400).json({e:e})
        }
    }
}