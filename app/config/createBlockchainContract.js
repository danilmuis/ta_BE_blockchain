const Web3 = require('web3');
require('dotenv').config();
const fs = require('fs');
const EthereumTx = require('ethereumjs-tx').Transaction;
let deploy_contract = undefined;

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));
const parameter = {
    from: process.env.NODE1,
    gas: '0x20c8e0',
    gasPrice: '0x2540be400'
};
const abi = process.env.ABI;
const payload = {data: process.env.ABI_BYTE};

deploy_contract = new web3.eth.Contract(JSON.parse(abi));
console.log("MEMBUAT CONTRACT......");

deploy_contract.deploy(payload).send(parameter, (err, transactionHash) => {
    console.log('Transaction Hash :', transactionHash);
    transaction_hash = transactionHash;
}).on('confirmation', () => {}).then(async function(newContractInstance) {
    console.log('Deployed Contract Address : ', newContractInstance.options.address);
    contract_address = newContractInstance.options.address;
    fs.writeFileSync('address.txt', transaction_hash+'\n'+contract_address);
    await newContractInstance.methods.saveHash('CONTRACT BERHASIL DIBUATIN').send(parameter);
    deploy_contract = new web3.eth.Contract(JSON.parse(abi),contract_address,{parameter});
    console.log("KONTRAK BERHASIL DIBUAT... SILAHKAN JALANKAN\n npm start");
});

