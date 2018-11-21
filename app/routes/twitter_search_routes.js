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
	});
};
