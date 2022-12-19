const Sequelize = require('sequelize')

const Model = Sequelize.Model;

class Marks extends Model{}

// const {Wastes} = require('./Wastes')


Marks.init (
    {
        id:	{type: Sequelize.INTEGER, primaryKey:true, unique: true, autoIncrementIdentity: true, required: true},
        Rubbish: {type: Sequelize.STRING, allowNull: false, required: true},
        PointsOKg: {type: Sequelize.INTEGER, allowNull: false, required: true},
        NewOKg: {type: Sequelize.FLOAT, allowNull: false, required: true},
    },
    { sequelize, modelName: 'Marks', tableName: 'marks', timestamps: false }
);

// Wastes.hasMany(Marks, {foreignKey: 'IdUser'});
// Marks.belongsTo(Wastes, {foreignKey: 'IdUser'});



module.exports = {Marks};
