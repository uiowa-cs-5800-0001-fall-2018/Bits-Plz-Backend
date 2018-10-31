
module.exports = function(app, db) {
	var twitter_key;
	if (app.settings.env == 'development') {
		twitter_key = require('../key.js');
	} 
	else {
		twitter_key = {
			consumer_key: process.env.consumer_key,
			consumer_secret: process.env.consumer_secret,
			access_token_key: process.env.access_token_key,
			access_token_secret: process.env.access_token_secret
		}
	}
	var Twitter = require('twitter');
	var client = new Twitter(twitter_key);

	app.post('/search', (req, res) => {
		client.get('search/tweets', {q: 'trump'}, function(error, tweets, response) {
   			console.log(tweets);
			res.send(tweets);
		});
		console.log(req.body);
		// res.send('hello');
	});
};
