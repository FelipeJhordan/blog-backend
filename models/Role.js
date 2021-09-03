const { DataTypes, Model } = require('sequelize')
const  {sequelize}   = require('../configs/sequelize')

class Role extends Model {}
Role.init({
    desc: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 10,
            max: 20
        }
    }
}, {
    modelName: 'roles',
    sequelize: sequelize,
    updatedAt: false,
    createdAt: false,
})


module.exports = Role