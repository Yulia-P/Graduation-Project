const Sequelize = require('sequelize')

const Model = Sequelize.Model;

class Ratings extends Model{}

const {Users} = require('../config/Users')
const {Articles} = require('../config/Articles')

Ratings.init (
    {
        id:	{type: Sequelize.INTEGER, primaryKey:true, unique: true, autoIncrementIdentity: true, required: true},
        Item: {type: Sequelize.INTEGER, allowNull: false, required: true},
        Commentator: {type: Sequelize.INTEGER, allowNull: false, required: true},
        Сomment: {type: Sequelize.STRING, required: true},
    },
    { sequelize, modelName: 'Ratings', tableName: 'ratings', timestamps: false }
);

Users.hasMany(Ratings, {foreignKey: 'Commentator'});
Ratings.belongsTo(Users, {foreignKey: 'Commentator'});
Articles.hasMany(Ratings, {foreignKey: 'Item'});
Ratings.belongsTo(Articles, {foreignKey: 'Item'});

module.exports = {Ratings};
