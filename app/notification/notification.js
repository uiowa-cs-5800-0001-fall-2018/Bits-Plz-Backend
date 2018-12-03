const CronJob = require('cron').CronJob;
const db = require('../../db/firebase');
// they are used in eval(), which is not properly recognized
// noinspection JSUnusedLocalSymbols
const search_tweets = require('../search');
// noinspection JSUnusedLocalSymbols
const send_email = require('./email');
const analyze = require('../semantic_analysis');
const simple_classification = require('../result_display');

const INTERVALS = {
    hourly: '1 1 * * * *',
    daily: '1 1 1 * * *',
    weekly: '1 1 1 * * 1',
    monthly: '1 1 1 1 * 1'
};

function sanity_check() {
    for (const interval in INTERVALS) {
        db.ref(`/auto notifications/${interval}`).once('value').then(snapshot => {
            snapshot.forEach(node => {
                console.log(interval, node.key);
            });
        });
    }
}

function notify(keyword, count, email) {
    let tweets = search_tweets(keyword, count);
    simple_classification(analyze(tweets)).subscribe({
        next: val => {
            let content = `
                            here is your latest update!
                            positive: ${val.positive}
                            negative: ${val.negative}
                            neutural: ${val.negative}`;
            send_email(email, 'update!', content);
        },
        error: err => { console.log(err) },
        complete: () => { console.log('complete') }
    });
}

function start_auto_notifications() {
    for (const interval in INTERVALS) {
        new CronJob(INTERVALS[interval], () => {
            db.ref(`/auto notifications/${interval}`).once('value').then(snapshot => {
                snapshot.forEach(node => {
                    notify(node.val().keyword, node.val().count, node.val().email);
                });
            });
        }, null, true, 'America/Chicago').start()
    }
}

module.exports = {
    start_auto_notifications: start_auto_notifications,
    sanity_check: sanity_check,
    notify: notify
};