'use strict'
var konek = require('./konek_blockchain');
var blockchain = require('./methodBlockchain');
const fs = require('fs');
exports.users = function(req,res){
    
    res.send(web3);
}

exports.index = async function(req,res){
    var x = await blockchain.loadHash(konek);   
    res.json(x);
}
exports.send = async function(req,res){
    await blockchain.saveHash(konek,req.body.data);
    res.status(201);
    res.json({'message' : 'berhasil'});
}
exports.contract = async function(req,res){
    let data = fs.readFileSync('./address.txt','utf8');
    res.status(200);
    res.json({
        'Contract Address ' : data.split('\n')[1],
        'Transaction Address' : data.split('\n')[0]
    });
}

exports.findUsers = function(req,res){
    var id = req.params.id
    connection.query('SELECT * FROM users WHERE id = ?',
    [id],
    function(err,result,fields){
        if(err){
            console.log(err)
            response.fail(err,res)
        }else{
            response.ok(result,res)
        }
    })
}

exports.createUsers = function(req,res){
    var nama = req.body.nama
    var email = req.body.email
    var tanggal = req.body.tanggal

    connection.query('INSERT INTO users (nama,email,tanggal) values (?,?,?)',
    [nama,email,tanggal], 
    function(err,result,fields){
        if(err){
            console.log(err)
            response.fail(err,res)
        }else{
            response.ok('User berhasil ditambahkan',res)
        }
    })
}

exports.updateUsers = function(req,res){
    var id = req.params.id
    var nama = req.body.nama
    var email = req.body.email
    var tanggal = req.body.tanggal

    connection.query('UPDATE users SET nama = ?, email = ?, tanggal = ? WHERE id = ?', 
    [nama,email,tanggal,id],
    function(err,result,fields){
        if(err){
            console.log(err)
            response.fail(err,res)
        }else{
            response.ok('User berhasil diupdate',res)
        }
    })
}

exports.deleteUsers = function(req,res){
    var id = req.body.id

    connection.query('DELETE FROM users WHERE id = ?',
    [id],
    function(err,result,fields){
        if(err){
            console.log(err)
            response.fail(err,res)
        }else{
            response.ok('User dengan id '+id+' berhasil dihapus',res)
        }
    })
}