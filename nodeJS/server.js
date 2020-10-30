var express = require('express');
require('dotenv').config();
var app = express();
var port = 9000;
var cors = require('cors');
var bodyParser = require('body-parser');
//var mdm = require('./nodeJS/mdm');

var konek = require('./konek_blockchain');
var blockchain = require('./methodBlockchain');


var controller = require('./controller');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./routes');
// routes(app);
app.use('/api',routes);

//handle production
//if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname + '/public'));

    //HANDLE SPA
    app.get(/.*/,(req,res) => res.sendFile(__dirname + '/public/index.html'));
//}
run();

async function run(){
    //await mdm.createAndDeployContract();
    
    // await blockchain.saveHash(konek,"MUIS");
    // var x = await blockchain.loadHash(konek);
    // console.log(x);
    //console.log(await contract.methods.loadHash().call());
    //var x = contract.methods.loadHash().call();
    //console.log(contract);
    app.listen(port,'127.0.0.1')
    console.log('server start on port ' + port)
};
