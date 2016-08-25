var User = require('../models/mentors'),
    encrypt = require('../utilities/encryption');

exports.getUsers = function(req,res){
	User.getUserList(2,function(err,result){
		 res.send(result);
	});
}

exports.getMentorStudent = function(req,res){
    User.getStudentList(2,function(err,result){
        res.send('test world');
    });
}

exports.addNewMentor = function(req, res){
    User.addNewMentor(req.body.mentor,function(err,result){
        res.send(result);
    });
};

exports.addMentorSession = function(req, res){
    User.addMentorSession(function(err,result){
        res.send(result);
    });
};