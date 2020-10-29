const Web3 = require('web3');
const fs = require('fs');
const EthereumTx = require('ethereumjs-tx').Transaction;
let deploy_contract = undefined;

let web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));
let data = fs.readFileSync('./address.txt','utf8');
let transaction_hash = data.split('\n')[0];
let contract_address = data.split('\n')[1];
let parameter = {
    from: process.env.NODE1,
    gas: '0xc3500',
    gasPrice: '0x2540be400'
};
let abi = process.env.ABI;
try{
    deploy_contract = new web3.eth.Contract(JSON.parse(abi),contract_address,{parameter});
}catch(e){
    throw 'SILAHKAN BUAT CONTRACT DAHULU : npm run create';
    
}
module.exports = deploy_contract;