var konek = require('./konek_blockchain');
var blockchain = require('./methodBlockchain');
const crypto = require('crypto');

//RIFKI PUNYA
class SessionUser {
    constructor(user){
      this.email = user.email;
      this.address = user.address;
      this.role = user.role;
      this.token = user.token;
      this.tokenVerification = false;
    }
  }
exports.login = async function(req,res){
    const addressSuperAdmin = "X";
    const email_hash = "0x" + crypto.createHash('SHA256').update(req.body.email).digest('HEX');
    const pass_hash = "0x" + crypto.createHash('SHA256').update(req.body.password).digest('HEX');

    console.log(email_hash, pass_hash);
    if(req.body.email == "admin@admin.com" && req.body.password == "superAdm1n"){
      const user = {
        "email" : req.body.email,
        "password" : req.body.password,
        "address" : addressSuperAdmin,
        "role" : 1,
      }
      user.token = nextToken(user.token);
      req.session.user = new SessionUser(user);
      res.json({
        status: 'OK',
        user: req.session.user
      });
    }else{
        const akun = userToJSON(await blockchain.getUser(konek,email_hash));
        if(akun['email'].toString() === email_hash.toString() && akun['password'].toString() === pass_hash.toString() ){
            
            akun.token = nextToken(akun.token);
            req.session.user = new SessionUser(akun);
            console.log(req.session.user);
            console.log(akun);
            res.json({
                status: 'OK',
                user: req.session.user
            });
        }else{
            res.status(401).send({ error: 'Email dan password tidak sesuai!' })
        }
    }
}
exports.logout = (req, res) => {
  req.session = null;
  res.json({'message' : 'logout success'});
}
exports.regisStaff = async(req, res) => {  
    var mailformat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    var pass_pattern=  /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    if(!req.body.email){
      res.status(401).send({ error: 'Email tidak boleh kosong' })
    }else if(!req.body.email.match(mailformat)){
      res.status(401).send({ error: 'Masukkan email dengan benar' })
    }

    if(!req.body.password){
      res.status(401).send({ error: 'Password tidak boleh kosong' })
    }else if(req.body.password.length < 8){
      res.status(401).send({ error: 'Password minimal 8 karakter' })
    }else if(!req.body.password.match(pass_pattern)){
        var a= 2;
        //res.status(401).send({ error: 'Password harus berisi angka, upper case, dan simbol' })
    }

    if(!req.body.role){
      res.status(401).send({ error: 'Jabatan harus dipilih' })
    }else if(req.body.role >= 1 && req.body.role <= 6){
      const email_hash = "0x" + crypto.createHash('SHA256').update(req.body.email).digest('HEX');
      const pass_hash = "0x" + crypto.createHash('SHA256').update(req.body.password).digest('HEX');
      
      const akun = userToJSON(await blockchain.getUser(konek,email_hash));
      if(akun.email.toString() === email_hash.toString()){
          res.status(401).send({ message : 'Email sudah terdaftar. Gunakan email lain'})
      }else{
          const addressStaff = process.env.NODE1;
          blockchain.addUser(konek,email_hash, pass_hash, addressStaff, req.body.role);
          res.json({
              status: 'OK'
          });
      }
    }else{
      res.status(401).send({ error: 'Pilih jabatan dengan benar' });
    }

    
}
exports.regisSuperAdmin = async(req, res) => {  
  
    var mailformat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    var pass_pattern=  /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if(!req.body.email){
      res.status(401).send({ error: 'Email tidak boleh kosong' })
    }else if(!req.body.email.match(mailformat)){
      res.status(401).send({ error: 'Masukkan email dengan benar' })
    }
    if(!req.body.password){
      res.status(401).send({ error: 'Password tidak boleh kosong' })
    }else if(req.body.password.length < 8){
      res.status(401).send({ error: 'Password minimal 8 karakter' })
    }else if(!req.body.password.match(pass_pattern)){
        var a= 2;
        //res.status(401).send({ error: 'Password harus berisi angka, upper case, dan simbol' })
    }

    const email_hash = "0x" + crypto.createHash('SHA256').update(req.body.email).digest('HEX');
    const pass_hash = "0x" + crypto.createHash('SHA256').update(req.body.password).digest('HEX');
    const akun = userToJSON(await blockchain.getUser(konek,email_hash));
    if(akun.email.toString() === email_hash.toString()){
        res.status(401).send({ message : 'Email sudah terdaftar. Gunakan email lain'})
    }else{
        const addressStaff = process.env.NODE1;
        blockchain.addUser(konek,email_hash, pass_hash, addressStaff, 1);
        res.json({
            status: 'OK'
        });
    }   
};


const nextToken = (previous) => {
    const min = 1;
    //it will provide big and save integer for JS
    const max = Math.pow(10, 15);
    function getRandomInt() {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    let newToken = getRandomInt();
    while(previous == newToken) {
      newToken = getRandomInt();
    }
    return newToken;
  }
  function userToJSON(user){
    var x = {
        'email':user[0],
        'password' : user[1],
        'address' : user[2],
        'role' : user[3],
    }
    return x;
}