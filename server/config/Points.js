const Sequelize = require('sequelize')

const Model = Sequelize.Model;

class Points extends Model{}

Points.init (
    {
        id:	{type: Sequelize.INTEGER, primaryKey:true, unique: true, autoIncrementIdentity: true, required: true},
        Address: {type: Sequelize.STRING, allowNull: false, unique: true, required: true},
        SecretKey: {type: Sequelize.INTEGER, allowNull: false, unique: true, required: true},
    },
    { sequelize, modelName: 'Points', tableName: 'points', timestamps: false }
);

module.exports = {Points};