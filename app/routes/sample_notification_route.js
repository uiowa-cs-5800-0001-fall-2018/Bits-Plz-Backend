const notify = require('../notification/notification').notify;

module.exports = function(app, db) {
    app.post('/sample', (req, res) => {
        const keyword = req.query.keyword;
        const count = parseInt(req.query.count);
        const email = req.query.email;
        notify(keyword, count, email);
        res.send('sent');
    });
};
