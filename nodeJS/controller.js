'use strict'
var konek = require('./konek_blockchain');
var blockchain = require('./methodBlockchain');
const fs = require('fs');
const path = require('path');
var ejs = require('ejs');
var pdf = require('html-pdf');
const puppeteer = require('puppeteer');
const mailService = require('./mailService');
const execSync = require('child_process').execSync;
exports.dashboard = function(req,res){
    res.render('index');
}
exports.admin = function(req,res){
    res.render('admin');
}
exports.transkrip = function(req,res){
    res.render('transkrip');
}
exports.approval = function(req,res){
    res.render('approval');
}
exports.generateTranskrip = async function(req,res){
    var template = fs.readFileSync('./reportTranskrip.html','utf8');
    var compiled = ejs.compile(template);
    var logo = (req.files.logo.data.toString('base64'));
    var pasfoto = (req.files.pas.data.toString('base64'));
    var html = compiled({
        data : req.body,
        logoUniv : "data:image/png;base64,"+logo,
        pasFoto : "data:image/png;base64,"+pasfoto,
    });
    const nama_file = "./transkrip/"+new Date().getTime()+".pdf";
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
     });
    const page = await browser.newPage();
    await page.setContent(html);
    //await page.pdf({ path: 'final.pdf', format: 'A4' });
    await page.pdf({ path: nama_file, width: '1000px', height: '1003px' });
    await browser.close();
    //PANGGIL IPFS-CTL ADD
    var hash = execSync(`ipfs-cluster-ctl add ${nama_file} | awk '{print $2}'`)+'';
    var file_path = path.join(__dirname+'/../',nama_file);
    //console.log(file_path);
    hash = hash.substr(0, hash.length-1)
    console.log("HASH: "+(hash));
    //LALU SEND HASILNYA KE BLOCKCHAIN
    await blockchain.setIjazah(konek,hash,req.body.nim,req.body.nama,false,req.body.nomor);

    //SEND EMAIL
    await mailService.kirimEmail(req.body.email,file_path,nama_file,'Transkrip',res);

    
}
exports.generateSertifikat = async function(req,res){
    
    var template = fs.readFileSync('./reportSertifikat.html','utf8');
    var latar = fs.readFileSync('./latar sertifikat.png').toString('base64');
    //console.log(latar);
    //console.log(template);
    var compiled = ejs.compile(template);
    var logo = (req.files.logo.data.toString('base64'));
    var pasfoto = (req.files.pas.data.toString('base64'));
    var html = compiled({
        data : req.body,
        logoUniv : "data:image/png;base64,"+logo,
        pasFoto : "data:image/png;base64,"+pasfoto,
        latar : "data:image/png;base64,"+latar,
    });
    const nama_file = "./ijazah/"+new Date().getTime()+".pdf";
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
     });
    const page = await browser.newPage();
    await page.setContent(html);
    //await page.pdf({ path: 'final.pdf', format: 'A4' });
    await page.pdf({ path: nama_file, width: '600px', height: '403px' });
    await browser.close();
    //PANGGIL IPFS-CTL ADD
    var hash = execSync(`ipfs-cluster-ctl add ${nama_file} | awk '{print $2}'`)+'';
    var file_path = path.join(__dirname+'/../',nama_file);
    //console.log(file_path);
    hash = hash.substr(0, hash.length-1)
    console.log("HASH: "+(hash));
    //LALU SEND HASILNYA KE BLOCKCHAIN
    await blockchain.setIjazah(konek,hash,req.body.nim,req.body.nama,true,req.body.nomor);
    
    //SEND EMAIL
    await mailService.kirimEmail(req.body.email,file_path,nama_file,'Ijazah',res);
}

exports.pageChecker = function(req, res) {
    res.render('blockchainserver',{'message':''});
}
exports.check = async function(req,res){
    var file = (req.files.file);
    var path = './ijazah/'+file.name;
    await file.mv(path);
    var output = execSync(`ipfs add "${path}" | awk '{print $2}'`)+'';
    output = output.substr(0, output.length-1)
    execSync(`rm "${path}"`);
    var ijazah = ijazahToJSON(await blockchain.getIjazah(konek));
    var result = getIjazahByHash(ijazah,output);
    if(result.length >0){
        res.status(200);
        res.json({
            'message' : result[0].data
        });
    }else{
        res.status(404);
        res.send('not found');
    }
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
exports.find = async function(req,res){
    var hashes = await blockchain.loadHash(konek);
    var find = hashes.find(function(element){
        return element==req.body.find;
    });

    res.json({'hash':find});
}

exports.setIjazah = async function(req,res){
    await blockchain.setIjazah(konek,req.body.data,req.body.nim,req.body.nama,req.body.berkas,req.body.nomor);
    res.status(201);
    res.json({'message' : 'Ijazah berhasil dikirim'});
}
exports.getIjazah = async function(req,res){
    var ijazah = await blockchain.getIjazah(konek);
    res.json(ijazahToJSON(ijazah));
}
exports.signature = async function(req,res){
    var ijazah = ijazahToJSON(await blockchain.getIjazah(konek));
    var find = ((element) => {
        if(element.data == req.body.hash){
            return element;
        }
    });

    const index = (ijazah.findIndex(find));
    if(index >= 0 ){
        await blockchain.signature(konek,index,req.body.role);
        res.json({'message':'Signature Done'});
    }else{
        res.status(404);
        res.json({'message':'Not Found'});
    }

    res.json((find));


}

function ijazahToJSON(ijazah){
    var data = [];
    var x = '';
    for(var i=0; i<ijazah.length; i++){
        x = {
            'data':ijazah[i][0],
            'nim' : ijazah[i][1],
            'nama' : ijazah[i][2],
            'berkas' : ijazah[i][3],
            'kaprodi': ijazah[i][4],
            'dekan' : ijazah[i][5],
            'rektor' : ijazah[i][6],
            'warek' : ijazah[i][7],
            'nomor' : ijazah[i][8],
            }
        data.push(x);
    }
    return data;
}


function getIjazahByHash(ijazah,hash){
    return ijazah.filter(
        function(data){ return data.data == hash }
    );
}




  
