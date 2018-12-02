const node_mailer = require('nodemailer');
const transporter = node_mailer.createTransport({
    service: 'yahoo',
    auth: {
        user: 'bitz_please@yahoo.com',
        pass: 'alekseygurtovoy'
    }
});

function send_mail(to, subject, text) {
    transporter.sendMail({
        from: 'bitz_please@yahoo.com',
        to: to,
        subject: subject,
        text: text
    }, function (error, info) {
        if (error) console.log(error);
        else console.log('Email sent: ' + info.response)
    });
}

module.exports = send_mail;