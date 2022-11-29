const Sequelize = require('sequelize')

const Model = Sequelize.Model;

class Users extends Model{}

Users.init (
    {
        id:	{type: Sequelize.INTEGER, primaryKey:true, unique: true, autoIncrementIdentity: true, required: true},
        username:{type: Sequelize.STRING,  allowNull: false, unique: true, required: true},    
        email: {type: Sequelize.STRING, allowNull: false, unique: true, required: true},
        passwordHash: {type: Sequelize.STRING, allowNull: false, required: true},
        avatarUrl: Sequelize.STRING,    
        role: {type: Sequelize.STRING,  validate: {isIn:[['user', 'admin']]} },
    },
    { sequelize, modelName:'Users', tableName:'users', timestamps: false}
);

module.exports = {Users};