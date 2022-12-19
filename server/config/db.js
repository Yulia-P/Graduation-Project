const sequelize = require('sequelize');
// const redis = require('redis')

global.sequelize = new sequelize('ecofuture', 'root', 'Zalesse2015!', {host:'localhost', dialect:'mysql'}) 

// докер
// global.sequelize = new sequelize('ecofuture', 'root', 'Zalesse2015!', {host:'host.docker.internal', dialect:'mysql'}) 

// const redisClient = redis.createClient('//redis-10275.c124.us-central1-1.gce.cloud.redislabs.com:10275',
// {password: 'RMjSK1pCVWjZARGPjtE9fOwjIbGTBQVz'})

const {Articles} = require('./Articles')
const {Discounts} = require('./Discounts')
const {Marks} = require('./Marks')
const {Points} = require('./Points')
const {Ratings} = require('./Ratings')
const {Receptions} = require('./Receptions')
const {Users} = require('./Users')

module.exports = {
    // redisClient,
    models: {Articles, Discounts, Marks, Points, Ratings, Receptions, Users}
}