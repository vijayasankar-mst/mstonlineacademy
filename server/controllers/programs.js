var programCtrl = require('../models/programs');


exports.getDegree = function(req,res){
	programCtrl.getDegreeList(function(err,result){
		 res.send(result);
	});
}

exports.getDegreeProgram = function(req, res){
	programCtrl.getDegreeProgramList(req.body.params.degreeid,function(err,result){
		 res.send(result);
	});
}

exports.getDegreeProgramAreaList = function(req, res){
	programCtrl.getDegreeProgramListArea(req.body.params.programid,function(err,result){
		 res.send(result);
	});
}