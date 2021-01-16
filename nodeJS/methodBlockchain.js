'use strict'
const Web3 = require('web3');
let parameter = {
    from: process.env.NODE1,
    gas: '0x20c8e0',
    gasPrice: '0x2540be400'
};
exports.loadHash = async function(contract){
    return await contract.methods.loadHash().call();
}
exports.saveHash = async function(contract,data){
    return await contract.methods.saveHash(data).send(parameter);
}
exports.setIjazah = async function(contract,data,nim,nama,berkas){
    return await contract.methods.setIjazah(data,nim,nama,berkas).send(parameter);
}
exports.getIjazah = async function(contract){
    return await contract.methods.getIjazah().call();
}
exports.getUser = async function(contract,email_hash){
    return await contract.methods.getData(email_hash).call();
}
exports.addUser = async function(contract, email_hash, pass_hash, addressStaff, role){
    return await contract.methods.addUserData(email_hash, pass_hash, addressStaff, role).send(parameter);
}