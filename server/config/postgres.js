var pg = require('pg');
//userModel = require('../models/User');
pg.defaults.ssl = true;

module.exports = function(config) {
	var db = pg.connect((process.env.DATABASE_URL || config.db),function (err, client, done) {
		// Handle connection errors
        if (err) {
             done();
			 console.log(err);
        }
    });
	
};