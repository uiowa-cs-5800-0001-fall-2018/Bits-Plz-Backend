const CronJob = require('cron').CronJob;
const fire_app = require('firebase');
const firebase_api_key = require('../keys/firebase_api_key.json');
const db = fire_app.initializeApp(firebase_api_key).database();
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

function start_auto_notifications() {
    for (const interval in INTERVALS) {
        new CronJob(INTERVALS[interval], () => {
            db.ref(`/auto notifications/${interval}`).once('value').then(snapshot => {
                snapshot.forEach(node => {
                    let tweets = search_tweets(node.val().keyword, node.val().count);
                    simple_classification(analyze(tweets)).subscribe({
                        next: val => {
                            let content = `
                            here is your latest update!
                            positive: ${val.positive}
                            negative: ${val.negative}
                            neutural: ${val.negative}
                        `;
                            send_email(values.email, 'update!', content);
                        },
                        error: err => { console.log(err) },
                        complete: () => { console.log('complete') }
                    });
                });

            });
        }, null, true, 'America/Chicago').start()
    }
}

module.exports = start_auto_notifications;