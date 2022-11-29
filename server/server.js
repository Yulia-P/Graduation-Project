const express = require('express')
const http = require('http')
const https = require('https')
const fs = require('fs')
const sequelize = require('sequelize')
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

app.use(cookieParser('ecofuture'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

let AuthRouter = require('./routes/AuthRouter')
app.use(AuthRouter)

const options = {
    key: fs.readFileSync('certificates/key.pem', "utf8"),
    cert: fs.readFileSync('certificates/cert.pem', "utf8")
};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

app.get('/',  (req, res) => {
    console.log("Hello");
});

// SERVER
httpServer.listen(8082, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server start localhost:8082')});

httpsServer.listen(8443, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server start localhost:8443')});