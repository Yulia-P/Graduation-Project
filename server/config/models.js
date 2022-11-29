const Sequelize = require('sequelize')

const Model = Sequelize.Model;

class Users extends Model{}

Users.init (
    {
        id:	{
            type: sequelize.INTEGER, 
            primaryKey:true, 
            unique: true, 
            autoIncrementIdentity: true, 
            required: true},

        username:{
            type: sequelize.STRING, 
            allowNull: false, 
            unique: true, 
            required: true},

        email:{
            type: sequelize.STRING, 
            allowNull: false, 
            unique: true, 
            required: true},
        
        passwordHash:{
            type: sequelize.STRING, 
            allowNull: false, 
            required: true},

        avatarUrl: sequelize.STRING,
    },
    {sequelize, modelName:'Users', tableName:'users', timestamps: false}
)

module.exports = {Users}

