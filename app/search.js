const Observable = require('rxjs');
const express = require('express');
const app = express();

let twitter_key;
if (app.settings.env == 'development') {
    twitter_key = require('./key.js');
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
let async = require('async');


function search_tweets(key_word, count) {
    return Observable.Observable.create((observer) => {
        client.get('search/tweets', {q: key_word, count: count}, function(error, tweets, response) {
            async.forEach(
                tweets.statuses,
                (tweet, call_back) => {
                    let hash_tags = [];
                    for (var hashtag_json in tweet.entities.hashtags)
                        if (hashtag_json.text !== null)
                            hash_tags.push(hashtag_json.text);
                    let tweet_simplified = {
                        titles: hash_tags,
                        region: tweet.user.location === '' ? null : tweet.user.location,
                        time: tweet.created_at,
                        content: tweet.text,
                    };
                    observer.next(tweet_simplified);
                    call_back(null);
                },
                err => {
                    if (err) console.log("an error occurred: ", err);
                    else {
                        console.log("processsing finished without any error");
                        observer.complete();
                    }
                }
            );
        });
    });
}

module.exports = search_tweets;