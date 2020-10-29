const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx').Transaction;
const fs = require('fs');
// Connection Initialization
const rpcURL = process.env.RPC_URL;
//let web3 = new Web3(rpcURL);
let web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));
let data = fs.readFileSync('./address.txt','utf8');
let transaction_hash = data.split('\n')[0];
let contract_address = data.split('\n')[1];
// try{
//      web3 = new Web3(rpcURL);
// }catch(e){
//     console.log('GETH NOT STARTED');
//     return;
// }

// Data set up

let bytecode = process.env.ABI_BYTE;


let account = process.env.NODE1;
//Contract object and account info



//let deploy_contract = undefined;
// let deploy_contract = new web3.eth.Contract(JSON.parse(abi));
// createAndDeployContract();
// try{
    
//     deploy_contract = new web3.eth.Contract(JSON.parse(abi),contract_address,{parameter});
    
//     panggil();
//     console.log('error')
// }catch(err){
    
//     createAndDeployContract();
// }


// Function Parameter

exports.panggil = async ()=>  {
    
    let parameter = {
        from: process.env.NODE1,
        gas: web3.utils.toHex(800000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei'))
    };
    let abi = process.env.ABI;
    try{
        deploy_contract = await new web3.eth.Contract(JSON.parse(abi),contract_address,{parameter});
    }catch(e){
        console.log(e)
    }
    var x = await (deploy_contract.methods.loadHash().call());
    console.log(x);
    
    
    
}
exports.createAndDeployContract = async function(){
    console.log(process.env.NODE1);
    // const Web3 = require('web3');

    // let web3 = new Web3(rpcURL);
    let abi = process.env.ABI;
    let payload = {
        data: process.env.ABI_BYTE
    }
    let parameter = {
        from: process.env.NODE1,
        gas: web3.utils.toHex(800000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei'))
    };
    // let data = fs.readFileSync('./address.txt','utf8');
    // let transaction_hash = data.split('\n')[0];
    // let contract_address = data.split('\n')[1];
    deploy_contract = new web3.eth.Contract(JSON.parse(abi));
    await deploy_contract.deploy(payload).send(parameter, (err, transactionHash) => {
        console.log('Transaction Hash :', transactionHash);
        transaction_hash = transactionHash;
    }).on('confirmation', () => {}).then(async function(newContractInstance) {
        console.log('Deployed Contract Address : ', newContractInstance.options.address);
        contract_address = newContractInstance.options.address;
        fs.writeFileSync('address.txt', transaction_hash+'\n'+contract_address)
        await newContractInstance.methods.saveHash('CONTRACT BERHASIL DIBUATIN').send(parameter);
        console.log("KELAR");
        
        // var x = await newContractInstance.methods.loadHash().call();
        // console.log(x);
    })
    
}
