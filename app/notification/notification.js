const CronJob = require('cron').CronJob;
// they are used in eval(), which is not properly recognized
// noinspection JSUnusedLocalSymbols
const search_tweets = require('../search');
// noinspection JSUnusedLocalSymbols
const send_email = require('./email');

const INTERVALS = {
    secondly: '* * * * * *',
    minutely: '1 * * * * *',
    hourly: '1 1 * * * *',
    daily: '1 1 1 * * *',
    weekly: '1 1 1 * * 1',
    monthly: '1 1 1 1 * 1'
};

function start_auto_notifications() {
    for (const interval in INTERVALS) {
        new CronJob(INTERVALS[interval], () => {
            eval(`
                let arr = [];
                search_tweets('trump', 10).subscribe({
                    next: tweet => arr.push(tweet),
                    error: err => console.log(err),
                    complete: () => console.log('complete')
                });
                send_email('r2dong@yahoo.com,', 'using eval to search and send mail', 'it works!');
            `);
            console.log('after eval');
        }, null, true, 'America/Chicago').start()
    }
}

module.exports = start_auto_notifications;