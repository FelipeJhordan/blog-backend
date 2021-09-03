const { DataTypes, Model } = require('sequelize')
const {sequelize} = require('../configs/sequelize')
const Post = require('./Post')
const User = require('./User')

class CommentPost extends Model {}

CommentPost.init({
    author: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: User, key: "id"}
    },
    text: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    target: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: Post, key: "id"},
        onDelete: 'cascade'
    }
}, {
    modelName: 'comments_post',
    sequelize: sequelize
})



module.exports = CommentPost   