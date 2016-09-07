var User = require('../models/mentors');
var encrypt = require('../utilities/encryption');

exports.getUsers = function (req, res) {
    User.getUserList(2, function (err, result) {
        res.send(result);
    });
}

exports.getMentorStudent = function (req, res) {
    User.getStudentList(2, function (err, result) {
        res.send(result);
    });
}

exports.addNewMentor = function (req, res) {
    User.addNewMentor(req.body.mentor, function (err, result) {
        res.send(result);
    });
};

exports.addMentorSession = function (req, res) {
    User.addMentorSession(req.body.sessionDetails, req.user.user_id, function (err, result) {
        res.send(result);
    });
};

exports.getPaperListMentor = function (req, res) {
    User.getPaperListMentor(req.user.user_id, function (err, result) {
        res.send(result);
    });
};

exports.getMentorSession = function (req, res) {
    User.getMentorSession(req.user.user_id, function (err, result) {
        res.send(result);
    });
};

exports.markSessionCompleted = function (req, res) {
    User.markSessionCompleted(req.body.sessionID, function (err, result) {
        res.send(result);
    });
};

exports.getTopMentors = function (req, res) {
    User.getTopMentors(function (err, result) {
        res.send(result);
    });
};

exports.getLatestStudents = function (req, res) {
    User.getLatestStudents(function (err, result) {
        res.send(result);
    });
};