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
//var mdm = require('./nodeJS/mdm');

var konek = require('./konek_blockchain');
var blockchain = require('./methodBlockchain');


app.use(morgan('common'));
app.use(helmet());
app.use('/public',express.static('static'));
app.set('view engine', 'ejs')
app.use(fileUpload())
app.use(cors({
    origin: `http://127.0.0.1:${port}`
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var controller = require('./controller');

var routes = require('./routes');
// routes(app);
app.use('/',routes);
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

app.post('/mdm',controller.generateSertifikat);

run();

async function run(){
    //await mdm.createAndDeployContract();
    
    // await blockchain.saveHash(konek,"MUIS");
    // var x = await blockchain.loadHash(konek);
    // console.log(x);
    //console.log(await contract.methods.loadHash().call());
    //var x = contract.methods.loadHash().call();
    //console.log(contract);
    app.listen(port,'127.0.0.1');
    console.log(`server start on http://localhost:${port} `);
};
