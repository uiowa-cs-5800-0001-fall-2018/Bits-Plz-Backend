const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const start_auto_notifications = require('./app/notification/notification');

app.use(
	bodyParser.urlencoded({extended: true}),
	cors()
);

require('./app/routes')(app, {});
app.listen(port, () => {
    console.log('We are live on ' + port);
	console.log('Environment: ' + app.settings.env);

	// start_auto_notifications();
});

module.exports = app;
