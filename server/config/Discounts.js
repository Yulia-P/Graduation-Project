const Sequelize = require('sequelize')

const Model = Sequelize.Model;

class Discounts extends Model{}

Discounts.init (
    {
        id:	{type: Sequelize.INTEGER, primaryKey:true, unique: true, autoIncrementIdentity: true, required: true},
        Discount: {type: Sequelize.STRING, allowNull: false, unique: true, required: true},
        PointD: {type: Sequelize.INTEGER, allowNull: false, required: true},
    },
    { sequelize, modelName: 'Discounts', tableName: 'discounts', timestamps: false }
);

module.exports = {Discounts};