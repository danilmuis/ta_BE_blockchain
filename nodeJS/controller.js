'use strict'
var konek = require('./konek_blockchain');
var blockchain = require('./methodBlockchain');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
var ejs = require('ejs');
var pdf = require('html-pdf');
const puppeteer = require('puppeteer');


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
    await blockchain.setIjazah(konek,hash);
    //LALU SEND FILE KE CLIENT
    // res.json({'message' : 'Ijazah berhasil dikirim : ' + hash});
    // res.download(nama_file,(err)=>{
    //     if(err){
    //         res.send('ERROR');
    //     }
        
    // });   
    //SEND EMAIL
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true, 
        auth: {
            user: 'sivilchain@gmail.com',
            pass: '123Sivil' // naturally, replace both with your real credentials or an application-specific password
        }
    });
    const mailOptions = {
        from: 'sivilchain@gmail.com',
        to: req.body.email,
        subject: 'File Transkrip',
        text: req.body.message,
        attachments: [{
            path: file_path,
            contentType: 'application/pdf'
        }]
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.json({'message':'EMAIL Error'});
        } else {
            console.log('Email sent: ' + info.response);
            //res.render('transkrip')
            var data = fs.readFileSync(file_path);
            res.status(200);
            res.contentType("application/pdf");
            //res.send(html);

            res.send(data);
            execSync(`rm ${nama_file}`);



        }
    });
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
    await blockchain.setIjazah(konek,hash);
    //LALU SEND FILE KE CLIENT
    // res.json({'message' : 'Ijazah berhasil dikirim : ' + hash});
    // res.download(nama_file,(err)=>{
    //     if(err){
    //         res.send('ERROR');
    //     }
        
    // });   
    //SEND EMAIL
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: 'sivilchain@gmail.com',
            pass: '123Sivil' // naturally, replace both with your real credentials or an application-specific password
        }
    });
    const mailOptions = {
        from: 'sivilchain@gmail.com',
        to: req.body.email,
        subject: 'File Ijazah',
        text: req.body.message,
        attachments: [{
            path: file_path,
            contentType: 'application/pdf'
        }]
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.json({'message':'EMAIL Error'});
        } else {
            console.log('Email sent: ' + info.response);
            //res.render('transkrip')
            var data = fs.readFileSync(file_path);
            res.status(200);
            res.contentType("application/pdf");

            res.send(data);
            execSync(`rm ${nama_file}`);



        }
    });
    //res.send(data_file);
    //res.json({'message' : 'Ijazah berhasil dikirim : ' + hash});

    console.log("DONE PDF ");
    
}
exports.buatHTML = async function(req,res){
    var template = fs.readFileSync('template.html','utf8');
    var compiled = ejs.compile(template);
    var html = compiled({
        title : req.body.title,
        text : req.body.text,
    });
    pdf.create(html).toFile('./template.pdf',function (){
        console.log("DONEEE")
    });
    
    res.send("DONE BUAT PDF");
}
exports.users = function(req,res){
    
    res.send(web3);
}

exports.pageChecker = function(req, res) {
    res.render('blockchainserver',{'message':''});
}
exports.check = async function(req,res){
    var file = (req.files.img_logo);
    var path = './ijazah/'+file.name;
    await file.mv(path);
    var output = execSync(`ipfs add ${path} | awk '{print $2}'`)+'';
    output = output.substr(0, output.length-1)
    execSync(`rm ${path}`);
    
    var ijazah = ijazahToJSON(await blockchain.getIjazah(konek));
    //var output = 'ijazah1';
    console.log(ijazah);
    var result = getIjazahByHash(ijazah,output);
    console.log(result);
    if(result.length >0){
        res.render('blockchainserver',{
            'message' : result[0].data
        });
    }else{
        res.render('blockchainserver',{
            'message' : '0'
        });
        //res.json({'message':'NOT FOUND'})
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
    await blockchain.setIjazah(konek,req.body.data);
    res.status(201);
    res.json({'message' : 'Ijazah berhasil dikirim'});
}
exports.getIjazah = async function(req,res){
    var ijazah = await blockchain.getIjazah(konek);
    res.json(ijazahToJSON(ijazah));
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

function ijazahToJSON(ijazah){
    var data = [];
    var x = '';
    for(var i=0; i<ijazah.length; i++){
        x = {
            'data':ijazah[i][0],
            'kaprodi': ijazah[i][1],
            'dekan' : ijazah[i][2],
            'rektor' : ijazah[i][3],
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

