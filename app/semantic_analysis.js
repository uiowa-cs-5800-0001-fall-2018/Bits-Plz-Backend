const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const Observable = require('rxjs').Observable;

// takes an observable of parsed tweets and attach a score to each
// tweet object emitted
function analyze(tweets) {
    return Observable.create(observer => {
        tweets.subscribe({
            next: tweet => {
                tweet.score = sentiment.analyze(tweet.content).score;
                observer.next(tweet);
            },
            error: err => console.log(err),
            complete: () => observer.complete()
        });
    });
}

module.exports = analyze;
