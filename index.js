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
var konek = require('./app/config/blockchainConnection');
var blockchain = require('./app/models/methodBlockchain');
var cookieSession = require('cookie-session')
app.use(morgan('common'));
//app.use(helmet());
// app.use('/public',express.static('static'));
// app.set('view engine', 'ejs')
app.use(fileUpload())

app.use(cors());
app.use(cookieSession({
    name: 'session',
    keys: ['secterKey'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
var user = require('./app/controllers/controller_user');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var controller = require('./app/controllers/certificateController');
var routes_staff = require('./routes/routes_staff');
var routes_admin = require('./routes/routes_admin');
var routes_public = require('./routes/routes_public');
var routes_creator = require('./routes/routes_creator');
var routes_authenticated = require('./routes/routes_authenticated');
var middleware = require('./app/middlewares/auth');
app.use('/',routes_public);
// app.use('/',middleware.authenticated,routes_authenticated);
// app.use('/staff',middleware.authenticated,middleware.staff,routes_staff);
// app.use('/admin',middleware.authenticated,middleware.admin,routes_admin);
// app.use('/',middleware.authenticated,middleware.creator,routes_creator);

app.use('/',routes_authenticated);
app.use('/staff',routes_staff);
app.use('/admin',routes_admin);
app.use('/',routes_creator);

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