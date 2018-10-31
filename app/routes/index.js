const searchRoutes = require('./twitter_search_routes.js');
module.exports = function(app, db) {
	searchRoutes(app, db);
}
