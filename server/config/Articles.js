const Sequelize = require('sequelize')

const Model = Sequelize.Model;

class Articles extends Model{}

const {Users} = require('../config/Users')

Articles.init (
    {
        id:	{type: Sequelize.INTEGER, primaryKey:true, unique: true, autoIncrementIdentity: true, required: true},
        Title:{type: Sequelize.STRING,  allowNull: false, unique: true, required: true},
        Text: {type: Sequelize.STRING, allowNull: false, unique: true, required: true},
        DatePub: {type: Sequelize.DATE, allowNull: false, required: true},
        ImageU: {type: Sequelize.STRING},
        Author: {type: Sequelize.INTEGER, allowNull: false, required: true},
    },
    { sequelize, modelName:'Articles', tableName:'articles', timestamps: false}
);

Users.hasMany(Articles, {foreignKey:'Author'});
Articles.belongsTo(Users, {foreignKey: 'Author'});
module.exports = {Articles};