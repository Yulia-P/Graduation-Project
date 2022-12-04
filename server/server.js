const express = require('express')
const http = require('http')
const https = require('https')
const fs = require('fs')
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const multer = require('multer')

app.use(cookieParser('ecofuture'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

let AuthRouter = require('./routes/AuthRouter');
let ArticlesRouter = require('./routes/ArticlesRouter');

app.use(AuthRouter);
app.use(ArticlesRouter);

const options = {
    key: fs.readFileSync('certificates/key.pem', "utf8"),
    cert: fs.readFileSync('certificates/cert.pem', "utf8")
};

global.accessKey = 'accsessTokenSecret'
global.refreshKey = 'refreshTokenSecret'
global.oldRefreshKeyCount = 0

var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

app.get('/',  (req, res) => {
    console.log("Hello");
});

app.use((req, res, next) => {
    if (req.cookies.accessToken) {
        jwt.verify(req.cookies.accessToken, accessKey, (err, user) => {
            if (err) next()
            else if(user) {
                req.user = user
                next()
            }
        })
    }
    else next()
})

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