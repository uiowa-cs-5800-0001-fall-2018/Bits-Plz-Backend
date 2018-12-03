const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const notifications = require('./app/notification/notification');
const db = require('./db/firebase') ;  // to grab the feature key

app.use(
	bodyParser.urlencoded({extended: true}),
	cors()
);

require('./app/routes')(app, {});
app.listen(port, () => {
    console.log('We are live on ' + port);
	console.log('Environment: ' + app.settings.env);

	db.ref('/notification flag').once('value', snapshot => {
		console.log(snapshot.val());
		if (snapshot.val()) {
			console.log('auto notifications are enabled');
            notifications.start_auto_notifications();
            notifications.sanity_check();
		} else {
			console.log('auto notifications are not enabled');
		}
	}).then();
});

module.exports = app;
