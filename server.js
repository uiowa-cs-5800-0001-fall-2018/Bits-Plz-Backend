const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
        user: 'bitz.please@yahoo.com',
        pass: 'alekseygurtovoy'
    }
});

app.use(
	bodyParser.urlencoded({extended: true}),
	cors()
);

require('./app/routes')(app, {});
app.listen(port, () => {
    console.log('We are live on ' + port);
	console.log('Environment: ' + app.settings.env);


	new CronJob('0 * * * * *', () => {
  		console.log('message');
	}, null, true, 'America/Chicago').start();

	var mailOptions = {
    	from: 'bitz.please@yahoo.com',
    	to: 'r2dong@yahoo.com',
    	subject: 'Sending Email using Node.js',
    	text: 'That was easy!'
	};

	transporter.sendMail(mailOptions, function(error,info){
    	if(error) {
        	console.log(error);
    	}
    	else {
        	console.log('Email sent: ' + info.response);
    	}
	});	
});
