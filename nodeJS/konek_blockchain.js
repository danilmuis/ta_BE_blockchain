const Web3 = require('web3');
const http = require('http');
const fs = require('fs');
const EthereumTx = require('ethereumjs-tx').Transaction;
let deploy_contract = undefined;
let web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));

http.get(process.env.RPC_URL)

let data = fs.readFileSync('./address.txt','utf8');
let transaction_hash = data.split('\n')[0];
let contract_address = data.split('\n')[1];
let parameter = {
    from: process.env.NODE1,
    gas: '0x10c8e0',
    gasPrice: '0x2540be400'
};
let abi = process.env.ABI;
try{
    deploy_contract = new web3.eth.Contract(JSON.parse(abi),contract_address,{parameter});
}catch(e){
    throw 'TIDAK TERHUBUNG DENGAN BLOCKCHAIN \n SILAHKAN BUAT CONTRACT DAHULU : npm run create';
}
module.exports = deploy_contract;