'use strict'
var konek = require('./konek_blockchain');
var blockchain = require('./methodBlockchain');
const fs = require('fs');
var ejs = require('ejs');
var pdf = require('html-pdf');
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
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    //await page.pdf({ path: 'final.pdf', format: 'A4' });
    await page.pdf({ path: 'final.pdf', width: '600px', height: '403px' });
    await browser.close();
    console.log("DONE PDF ");
//    const nodeHtmlToImage = require('node-html-to-image')
// await nodeHtmlToImage({
//   output: './image.png',
//   html: html,
// })
//   .then(() => console.log('The image was created successfully!'));
//   var PDFDocument = require('pdfkit');
//   var doc = new PDFDocument

// //Pipe its output somewhere, like to a file or HTTP response 
// //See below for browser usage 
//     doc.pipe(fs.createWriteStream('output.pdf'))


//     //Add an image, constrain it to a given size, and center it vertically and horizontally 
//     doc.image('./image.png', {
//     fit: [600, 700],
//     align: 'center',
//     valign: 'center'
//     });



//     doc.end()
  res.send(html);
    
    // res.render('sertifikat', {
    //     data: req.body
    // });
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