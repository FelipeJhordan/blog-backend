const { DataTypes, Model } = require('sequelize')
const {sequelize} = require('../configs/sequelize')
const Role = require("./Role")
const Post = require("./Post")
class User extends Model {}
User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 10,
            max: 20
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 4,
            max: 20
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
 
}, {
    modelName: 'users',
    sequelize: sequelize,
    hooks: {
        afterSync() {

        Role.findOrCreate({
            where: { desc: "ADMIN"},
        }).then(async (roles) => {
            await User.findOrCreate({
                    where: { 
                        username: "ADMIN", 
                        name: "ADMIN", 
                        password: '$2b$14$VvuGGUNyO3Xo.7UaxUznSe.n1EV4H0OYp6WR65u3jUjtD.KDZhZbC', 
                        email: "admin@admin.com", 
                        role: roles[0].id
                    }
                })
        })

        Role.findOrCreate({
                where: {desc: "USER"}
        })
        }
    }
})

User.belongsTo(Role, {
            as: "users_role",
            foreignKey: "role",
            onDelete: 'SET NULL',
        })

User.hasMany(Post, {
    as:"post_role",
    foreignKey: "author"
})

module.exports = User