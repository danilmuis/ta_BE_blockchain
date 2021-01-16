require('dotenv').config();
var express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const helmet = require('helmet');

var app = express();
var port = process.env.PORT || 9000;
var cors = require('cors');
var bodyParser = require('body-parser');
var konek = require('./konek_blockchain');
var blockchain = require('./methodBlockchain');
var cookieSession = require('cookie-session')
app.use(morgan('common'));
//app.use(helmet());
app.use('/public',express.static('static'));
app.set('view engine', 'ejs')
app.use(fileUpload())
// app.use(cors({
//     origin: `http://0.0.0.0:${port}`
// }));
app.use(cors());
app.use(cookieSession({
    name: 'session',
    keys: ['secterKey'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var controller = require('./controller');
var routes = require('./routes');
app.use('/',routes);
// app.use(function (req, res, next) {
//     res.set("Content-Security-Policy", "default-src 'self'");
//     next();
//   });
//Error handler
app.use((req,res,next) =>{
    const error = new Error(`NOT FOUND BRUH - ${req.originalUrl}`);
    res.status(404);
    next(error);
});
app.use((error,req,res,next) =>{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message : error.message,
        stack : error.stack,
    });
});
run();

async function run(){
    app.listen(port,'0.0.0.0');
    console.log(`server start on http://localhost:${port} `);
};