var auth = require('./auth');
var mentors = require('../controllers/mentors');
var students = require('../controllers/students');
var degprogram = require('../controllers/programs');

module.exports = function (app) {

    app.post('/api/v1/authenticate', auth.authenticate);

    // Get the list of degrees
    app.get('/api/getdegreelist', degprogram.getDegree);

    // Get the program area for the appropriate degree
    app.post('/api/getdegreeprogram', degprogram.getDegreeProgram);

    // Get the program for the appropriate degree and program area
    app.post('/api/getdegreeprogramarea', degprogram.getDegreeProgramAreaList);

    // Get the papers for the appropriate program
    app.post('/api/getCourses', degprogram.getCourses);

    // Get the list of all papers with mentors
    app.post('/api/getpaperswithmentors', degprogram.getPapersWithMentors);

    // Get the list of all programs with paper count
    app.post('/api/getprogramswithpapercount', degprogram.getProgramWithPaperCount);

    // Get the list of all program areas
    app.get('/api/getprogramarealist', degprogram.getProgramAreaList);

    // Save the edited details for papers
    app.post('/api/savepaperedit', degprogram.savePaperEdit);

    // Delete a paper
    app.post('/api/deletepaper', degprogram.deletePaper);

    // Add new paper
    app.post('/api/savepapernew', degprogram.savePaperNew);

    // 
    app.post('/api/getstudentdetails', students.getStudentDetails);

    app.post('/api/v1/savestudentinformation', students.createUser);

    app.get('/api/getalluserscount', students.getUsersCount);

    app.get('/api/getstudentinfo', students.getStudentInfo);

    app.post('/api/getpaperlist', students.getPaperList);

    app.post('/api/editProfile', students.updateProfileInfo);

    app.post('/api/studentopportunity', students.studentOpportunity);

    //Get the list of all sessions for students
    app.get('/api/getsessionlistforstudent', students.getSessionListStudent);

    //Add schedule for session handled by mentor
    app.post('/api/mentorsession', mentors.addMentorSession);

    //Get the list of sessions for the mentor
    app.get('/api/getmentorsession', mentors.getMentorSession);

    //Mark session completed
    app.post('/api/marksessioncompleted', mentors.markSessionCompleted);

    //Get the list of all papers for mentor
    app.get('/api/getpaperlistformentor', mentors.getPaperListMentor);

    //Get the list of all top mentors
    app.get('/api/gettopmentors', mentors.getTopMentors);

    //Get the list of latest students
    app.get('/api/getlateststudents', mentors.getLatestStudents);

    app.get('/api/mentorusers', mentors.getUsers);
    app.get('/api/mentorstudents', mentors.getMentorStudent);
    app.post('/api/addNewMentor', mentors.addNewMentor)
    app.get('/api/studentusers', students.getStudentList);

    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });

    app.post('/auth/isloggedin', function (req, res) {
        if (req.isAuthenticated()) {
            res.send({state: 'success', user: req.user});
        } else {
            res.send({state: 'failure', user: null});
        }
    });

    app.route('/site/*').get(function (req, res) {
        res.render('sitehome', {bootstrappedUser: req.user});
    })

    app.get('/dashboard/*', function (req, res) {
        res.render('sitehome', {bootstrappedUser: req.user});
    });

    app.get('*', function (req, res) {
        res.render('index', {bootstrappedUser: req.user});
    });
}
