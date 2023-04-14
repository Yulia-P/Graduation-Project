const Sequelize = require('sequelize')

const Model = Sequelize.Model;

class Used_discounts extends Model{}

const {Users} = require('../config/Users')
const {Discounts} = require('../config/Discounts')


Used_discounts.init(
    {
        id: {type: Sequelize.INTEGER, primaryKey:true, unique: true, autoIncrementIdentity: true, required: true},
        discount_id: {type: Sequelize.INTEGER, allowNull: false, required: true},
        user_id:{type: Sequelize.INTEGER, allowNull: false, required: true},
        used: {type: Sequelize.INTEGER, allowNull: false, defaultValue:0 } ,
    },
    {sequelize, modelName: 'Used_discounts', tableName: 'used_discounts', timestamps: false}
);

Users.hasMany(Used_discounts, {foreignKey:'user_id'});
Used_discounts.belongsTo(Users, {foreignKey: 'user_id'});

Discounts.hasMany(Used_discounts, {foreignKey:'discount_id'});
Used_discounts.belongsTo(Discounts, {foreignKey: 'discount_id'});

module.exports = {Used_discounts};