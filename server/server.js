const express = require('express')
const http = require('http')
const https = require('https')
const fs = require('fs')
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const cors = require('cors')
const checkAuth = require('./utils/checkAuth');
// const fileUpload = require('express-fileupload')

app.use(cookieParser('ecofuture'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
// app.use(fileUpload(undefined));
app.use(express.static('uploads'))

let AuthRouter = require('./routes/AuthRouter');
let ArticlesRouter = require('./routes/ArticlesRouter');
let RatingsRouter = require('./routes/RatingsRouter');
let PointsRouter = require('./routes/PointsRouter');
let DiscountsRouter = require('./routes/DiscountsRouter');
let MarksRouter = require('./routes/MarksRouter');
let ReceptionsRouter = require('./routes/ReceptionsRouter');
let KeysRouter = require('./routes/KeysRouter');
let Check_weightsRouter = require('./routes/Check_weightsRouter');
let Used_discountsRouter = require('./routes/Used_discountsRouter');
let UsersRouter = require('./routes/UsersRouter');
let Promo_codesRouter = require('./routes/Promo_codesRouter');


const storage = multer.diskStorage({
    destination: ( _, __, cb) => {
        cb(null, 'uploads');
    },
    filename: ( _, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    try {
        res.json({
            url: `/uploads/${req.file.originalname}`,
        });
    }catch(e){
        console.log(e);
    }
});

app.use('/uploads', express.static('uploads'));
app.use(AuthRouter);
app.use(ArticlesRouter);
app.use(RatingsRouter);
app.use(PointsRouter);
app.use(DiscountsRouter);
app.use(MarksRouter);
app.use(ReceptionsRouter);
app.use(KeysRouter);
app.use(Check_weightsRouter);
app.use(Used_discountsRouter);
app.use(UsersRouter);
app.use(Promo_codesRouter);



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