var User = require('../models/mentors'),
    encrypt = require('../utilities/encryption');

exports.getUsers = function(req,res){
	User.getUserList(2,function(err,result){
		 res.send(result);
	});

}