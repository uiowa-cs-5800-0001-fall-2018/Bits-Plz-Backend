const searchRoutes = require('./twitter_search_routes.js');
const notifyRoutes = require('./sample_notification_route');
module.exports = function(app, db) {
	searchRoutes(app, db);
	notifyRoutes(app, db);
};
