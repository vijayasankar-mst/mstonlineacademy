var programCtrl = require('../models/programs');


exports.getDegree = function(req,res){
	programCtrl.getDegreeList(function(err,result){
		 res.send(result);
	});
}

exports.getProgramAreaList = function(req,res){
	programCtrl.getProgramAreaList(function(err,result){
		 res.send(result);
	});
}

exports.getDegreeProgram = function(req, res){
	programCtrl.getDegreeProgramList(req.body.params.degreeid,function(err,result){
		 res.send(result);
	});
}

exports.getDegreeProgramAreaList = function(req, res){
	programCtrl.getDegreeProgramListArea(req.body.params.programid,req.body.params.degreeid,function(err,result){
		 res.send(result);
	});
}

exports.getProgramWithPaperCount = function(req, res){
	programCtrl.getProgramWithPaperCount(req.body.params.programid,req.body.params.degreeid,function(err,result){
		 res.send(result);
	});
}

exports.getCourses = function(req, res){
	programCtrl.getCourses(req.body.params.program_code,function(err,result){
		 res.send(result);
	});
}

exports.getPapersWithMentors = function(req, res) {
	programCtrl.getPapersWithMentors(req.body.params.program_code,function(err,result){
		 res.send(result);
	});
}

exports.savePaperEdit = function(req, res) {
	programCtrl.savePaperEdit(req.body.params.paperID,req.body.params.paperName,req.body.params.paperCode,req.body.params.paperCost,req.body.params.mentorID,function(err,result){
		 res.send(result);
	});
}