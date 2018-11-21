const search = require('../search');
const analyze = require('../semantic_analysis');

module.exports = function(app, db) {
    app.post('/search', (req, res) => {
    	let arr = [];
    	analyze(search('trump', 10)).subscribe({
			next: tweet => arr.push(tweet),
			error: err => console.log(err),
			complete: () => res.send(arr)
		});

	// 	client.get('search/tweets', {q: 'trump', count: 1000}, function(error, tweets, response) {
   	// 		let parsed_tweets = [];
   	// 		async.forEach(
   	// 			tweets.statuses,
	// 			(tweet, call_back) => {
	// 				let hash_tags = [];
	// 				for (var hashtag_json in tweet.entities.hashtags)
	// 					if (hashtag_json.text !== null)
	// 						hash_tags.push(hashtag_json.text);
	// 				let tweet_simplified = {
	// 					titles: hash_tags,
	// 					region: tweet.user.location === '' ? null : tweet.user.location,
	// 					time: tweet.created_at,
	// 					content: tweet.text,
	// 					score: sentiment.analyze(tweet.text).score
	// 				};
	// 				parsed_tweets.push(tweet_simplified);
	// 				call_back(null);
	// 			},
	// 			(err) => {
	// 				if (err) {
	// 					console.log("an error occurred: ", err);
	// 					res.send('an internal server error occurred');
	// 				}
	// 				else {
	// 					console.log("processsing finished without any error");
	// 					parsed_tweets.sort(function (tweet_1, tweet_2) {
	// 						if (tweet_1.score < tweet_2.score)
	// 							return -1;
	// 						else if (tweet_1.score > tweet_2.score)
	// 							return 1;
	// 						else
	// 							return 0;
	// 					});
	// 					res.send(parsed_tweets);
	// 				}
	// 			}
	// 		);
	// 	});
	});
};
