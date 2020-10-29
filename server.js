var express = require('express');
require('dotenv').config();
var app = express();
var port = 9000;
var cors = require('cors');
var bodyParser = require('body-parser');
//var mdm = require('./nodeJS/mdm');

var konek = require('./nodeJS/konek_blockchain');
var blockchain = require('./nodeJS/methodBlockchain');


var controller = require('./nodeJS/controller');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./nodeJS/routes');
routes(app);

run();

async function run(){
    //await mdm.createAndDeployContract();
    
    // await blockchain.saveHash(konek,"MUIS");
    // var x = await blockchain.loadHash(konek);
    // console.log(x);
    //console.log(await contract.methods.loadHash().call());
    //var x = contract.methods.loadHash().call();
    //console.log(contract);
    app.listen(port)
    console.log('server start on port ' + port)
};
