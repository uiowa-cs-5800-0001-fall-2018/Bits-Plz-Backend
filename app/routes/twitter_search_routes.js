const search = require('../search');
const analyze = require('../semantic_analysis');

module.exports = function(app, db) {
    app.post('/search', (req, res) => {
        const keyword = req.query.keyword;
        const count = req.query.count;
        if (!keyword || !count || ! ) {
            res.send({
                'titles': ['in valid post request URL'],
                'region': 'Asgard',
                'time': "Sat Jan 01 18:00:27 +0000 1800",
                'content': 'invalid requests do not get contents!',
                "score": -999999
            });
        }
        else {
        	let arr = [];
			analyze(search(keyword, count)).subscribe({
				next: tweet => arr.push(tweet),
				error: err => console.log(err),
				complete: () => res.send(arr)
			});
    	}
	});
};
