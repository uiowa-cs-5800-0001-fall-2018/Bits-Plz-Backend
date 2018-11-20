const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
var cors = require('cors')

app.use(
	bodyParser.urlencoded({extended: true}),
	cors()
);

require('./app/routes')(app, {});
app.listen(port, () => {
    console.log('We are live on ' + port);
	console.log('Environment: ' + app.settings.env);

	var CronJob = require('cron').CronJob;
	new CronJob('0 * * * * *', () => {
  		console.log('message');
	}, null, true, 'America/Chicago').start();
});


