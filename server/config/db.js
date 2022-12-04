const sequelize = require('sequelize');
// const redis = require('redis')

global.sequelize = new sequelize('ecofuture', 'root', 'Zalesse2015!', {host:'localhost', dialect:'mysql'}) 

// const redisClient = redis.createClient('//redis-10275.c124.us-central1-1.gce.cloud.redislabs.com:10275',
// {password: 'RMjSK1pCVWjZARGPjtE9fOwjIbGTBQVz'})

const {Users} = require('./Users')
const {Articles} = require('./Articles')
// const {Users} = require('./Users')


module.exports = {
    // redisClient,
    models: {Users, Articles}
}