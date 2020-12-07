const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host : 'smtp.gmail.com',
    service : 'Gmail',
    secure : true, // true for 465, false for other ports
    port : 465,
    auth : {
        user : 'resoak32@gmail.com', // generated ethereal user
        pass : '' // generated ethereal password
    },
    ignoreTLS : true,
    tls : {
        rejectUnauthorized : false
    },
    logger : false,
    debug : false
});

const sendMail = (to, subject, data) => {
    // setup email data with unicode symbols
    let mailOptions = {
        from: 'Lets Dunch', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("err : ",error);
        }
    })
}

module.exports = {
    sendMail
}