var auth = require('./auth'),
   mentors = require('../controllers/mentors'),
   students = require('../controllers/students');
   degprogram = require('../controllers/programs');


module.exports = function(app) {

	// ==============================================

	app.post('/api/v1/authenticate',  auth.authenticate);

	app.get('/api/getdegreelist',degprogram.getDegree);

	app.post('/api/getdegreeprogram',degprogram.getDegreeProgram);

	app.post('/api/getdegreeprogramarea',degprogram.getDegreeProgramAreaList);
	
	app.post('/api/getCourses',degprogram.getCourses);

	app.post('/api/getstudentdetails',students.getStudentDetails);

	app.post('/api/v1/savestudentinformation', students.createUser);

	app.get('/api/getalluserscount', students.getUsersCount);


	app.post('/logout', function(req, res) { req.logout();  res.end(); });

	app.post('/auth/isloggedin', function(req, res){  if(req.isAuthenticated()) { res.send({state: 'success', user: req.user}); }
	    else  { res.send({state: 'failure', user: null});  }
	});


	app.get('/api/mentorusers', mentors.getUsers);


	app.route('/site/*').get(function(req, res) {res.render('sitehome', {  bootstrappedUser: req.user });})

    app.get('/dashboard/*', function(req, res) { res.render('sitehome',{bootstrappedUser: req.user});});

	app.get('*', function(req, res) { res.render('index', {bootstrappedUser: req.user});});
}