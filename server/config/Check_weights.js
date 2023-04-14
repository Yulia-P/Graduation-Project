const Sequelize = require('sequelize')

const Model = Sequelize.Model;

class Check_weights extends Model{}

const {Marks} = require('../config/Marks')


Check_weights.init(
    {
        id: {type: Sequelize.INTEGER, primaryKey:true, unique: true, autoIncrementIdentity: true, required: true},
        id_rubbish: {type: Sequelize.INTEGER, allowNull: false, required: true},
        weight: {type: Sequelize.INTEGER, allowNull: false, required: true},
        key_of_weight: {type: Sequelize.STRING, allowNull: false, required: true}
    },
    {sequelize, modelName: 'Check_weights', tableName: 'check_weight', timestamps: false}
);

Marks.hasMany(Check_weights, {foreignKey:'id_rubbish'});
Check_weights.belongsTo(Marks, {foreignKey: 'id_rubbish'});

module.exports = {Check_weights};