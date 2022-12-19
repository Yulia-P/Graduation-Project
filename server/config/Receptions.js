const Sequelize = require('sequelize')

const Model = Sequelize.Model;

class Receptions extends Model{}

const {Users} = require('./Users')
// const {Wastes} =require('./Wastes')
// const {Points} = require('./Points')

Receptions.init (
    {
        id:	{type: Sequelize.INTEGER, primaryKey:true, unique: true, autoIncrementIdentity: true, required: true},
        idUser: {type: Sequelize.INTEGER, allowNull: false, required: true},
        Accrued: {type: Sequelize.INTEGER, required: true},
        NewKg: {type: Sequelize.INTEGER, required: true},
        Weight: {type: Sequelize.FLOAT, allowNull: false, required: true},
        TypeWaste: {type: Sequelize.STRING, allowNull: false, required: true},
        StationKey: {type: Sequelize.STRING, allowNull: false, required: true},

    },
    { sequelize, modelName: 'Receptions', tableName: 'receptions', timestamps: false }
);


Users.hasMany(Receptions, {foreignKey: 'idUser'});
Receptions.belongsTo(Users, {foreignKey: 'idUser'});

module.exports = {Receptions};