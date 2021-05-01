const Web3 = require('web3');
const http = require('http');
const fs = require('fs');
const EthereumTx = require('ethereumjs-tx').Transaction;
let deploy_contract = undefined;
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));

http.get(process.env.RPC_URL)

const data = fs.readFileSync('./address.txt','utf8');
const transaction_hash = data.split('\n')[0];
const contract_address = data.split('\n')[1];
const parameter = {
    from: process.env.NODE1,
    gas: '0x20c8e0',
    gasPrice: '0x2540be400'
};
const abi = process.env.ABI;
try{
    deploy_contract = new web3.eth.Contract(JSON.parse(abi),contract_address,{parameter});
}catch(e){
    throw 'TIDAK TERHUBUNG DENGAN BLOCKCHAIN \n SILAHKAN BUAT CONTRACT DAHULU : npm run create';
}
module.exports = deploy_contract;