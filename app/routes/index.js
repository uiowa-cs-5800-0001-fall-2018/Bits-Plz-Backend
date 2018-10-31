const noteRoutes = require('./twitter_search_routes.js');
module.exports = function(app, db) {
	noteRoutes(app, db);
}
