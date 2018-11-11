module.exports = function(app, db) {
	let twitter_key;
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
	let Twitter = require('twitter');
	let client = new Twitter(twitter_key);
	let Sentiment = require('sentiment');
    let sentiment = new Sentiment();
	let async = require('async');

    app.post('/search', (req, res) => {
		client.get('search/tweets', {q: 'trump'}, function(error, tweets, response) {
   			let parsed_tweets = [];
   			async.forEach(
   				tweets.statuses,
				(tweet, call_back) => {
					let hash_tags = [];
					for (var hashtag_json in tweet.entities.hashtags)
						hash_tags.push(hashtag_json.text);
					let tweet_simplified = {
						titles: hash_tags,
						region: tweet.user.location === '' ? null : tweet.user.location,
						time: tweet.created_at,
						content: tweet.text,
						score: sentiment.analyze(tweet.text).score
					};
					parsed_tweets.push(tweet_simplified);
					call_back(null);
				},
				(err) => {
					if (err) {
						console.log("an error occurred: ", err);
						res.send('an internal server error occurred');
					}
					else {
						console.log("processsing finished without any error");
						parsed_tweets.sort(function (tweet_1, tweet_2) {
							if (tweet_1.score < tweet_2.score)
								return -1;
							else if (tweet_1.score > tweet_2.score)
								return 1;
							else
								return 0;
						});
						res.send(parsed_tweets);
					}
				}
			);
		});
	});
};
