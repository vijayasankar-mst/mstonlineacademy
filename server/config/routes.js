var pg = require('pg');

module.exports = function(app) {

	app.get('*', function(req, res) {
	    res.render('index', {
	      bootstrappedUser: req.user
	    });
	});
}