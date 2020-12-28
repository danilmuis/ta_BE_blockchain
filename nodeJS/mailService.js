const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD // naturally, replace both with your real credentials or an application-specific password
    }
});
const kirimEmail = ((email,file_path,nama_file,berkas)=> {

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: `File ${berkas}`,
        text: `Simpan File ${berkas}mu dengan baik`,
        attachments: [{
            path: file_path,
            contentType: 'application/pdf'
        }]
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500)
            res.json({'message':'EMAIL Error'});
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200);
            res.json({'message':'DONE'});
            execSync(`rm ${nama_file}`);
        }
    });
});

module.exports = {
    kirimEmail,
};