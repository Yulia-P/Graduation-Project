const Sequelize = require('sequelize')

const Model = Sequelize.Model;

class Users extends Model{}
// const {Articles} = require('../config/Articles')

Users.init (
    {
        id:	{type: Sequelize.INTEGER, primaryKey:true, unique: true, autoIncrementIdentity: true, required: true},
        username:{type: Sequelize.STRING,  allowNull: false, unique: true, required: true},    
        email: {type: Sequelize.STRING, allowNull: false, unique: true, required: true},
        passwordHash: {type: Sequelize.STRING, allowNull: false, required: true},
        avatarUrl: {type: Sequelize.STRING, allowNull: false},   
        role: {type: Sequelize.STRING,  validate: {isIn:[['user', 'admin']]} },
    },
    { sequelize, modelName:'Users', tableName:'users', timestamps: false}
);

// Articles.belongsTo(Users);

module.exports = {Users};