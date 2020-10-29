'use strict'
const Web3 = require('web3');
let parameter = {
    from: process.env.NODE1,
    gas: '0xc3500',
    gasPrice: '0x2540be400'
};
exports.loadHash = async function(contract){
    return await contract.methods.loadHash().call();
}
exports.saveHash = async function(contract,data){
    return await contract.methods.saveHash(data).send(parameter);
}