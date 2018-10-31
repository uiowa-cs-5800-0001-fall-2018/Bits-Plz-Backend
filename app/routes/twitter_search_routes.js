var twitter_key = require('../key.js');
var Twitter = require('twitter');
var client = new Twitter(twitter_key);

module.exports = function(app, db) {
	app.post('/search', (req, res) => {
		client.get('search/tweets', {q: 'trump'}, function(error, tweets, response) {
   			console.log(tweets);
			res.send(tweets);
		});
		console.log(req.body);
		// res.send('hello');
	});
};
