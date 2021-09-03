const { DataTypes, Model } = require('sequelize')
const {sequelize} = require('../configs/sequelize')

class Post extends Model {}

Post.init({
    title: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
            min: 1,
            max: 45
        },
    },
    titleUrl: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
            min: 1,
            max: 45
        },
        unique: true
    },
    subtitle: {
        type: DataTypes.STRING,
        allowNull: true
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    allowComments: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    modelName: 'posts',
    sequelize: sequelize
})



module.exports = Post   