const { DataTypes, Model } = require('sequelize')
const {sequelize} = require('../configs/sequelize')
const Post = require('./Post')
const User = require('./User')

class CommentUser extends Model {}

CommentUser.init({
    author: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: User, key: "id"}
    },
    text: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    post: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: Post, key: "id"},
        onDelete: 'cascade'

    },
    target: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: User, key: "id"},
        onDelete: 'cascade'
    }
}, {
    modelName: 'comments_user',
    sequelize: sequelize
})



module.exports = CommentUser   