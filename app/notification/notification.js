const CronJob = require('cron').CronJob;

const INTERVALS = {
    secondly: '* * * * * *',
    hourly: '1 1 * * * *',
    daily: '1 1 1 * * *',
    weekly: '1 1 1 * * 1',
    monthly: '1 1 1 1 * 1'
};

function start_auto_notifications() {
    for (const interval in INTERVALS) {
        new CronJob(INTERVALS[interval], () => {
            console.log('message');
        }, null, true, 'America/Chicago').start()
    }
}

module.exports = start_auto_notifications;