const nodemailer = require('nodemailer');

transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'email@gmail.com',
        pass: 'abc'
    }
});

exports.sendMailService = (mailOptions) => {
    mailOptions.from = 'email@gmail.com';
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return false;
        } else {
            return true;
        }
    });
}