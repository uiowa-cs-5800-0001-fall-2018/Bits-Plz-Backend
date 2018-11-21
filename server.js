const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const CronJob = require('cron').CronJob;
const send_mail = require('./app/notification/email.js');

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

	send_mail('r2dong@yahoo.com', 'ah, title', 'ah, contents');
});
