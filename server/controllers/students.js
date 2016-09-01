var User = require('../models/students'),
    encrypt = require('../utilities/encryption');

exports.createUser = function(req, res, next) {
  var userData = req.body;
  //userData.username = userData.username.toLowerCase();
 // userData.salt = encrypt.createSalt();
  //userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
  User.create(userData.params.studentdetails, function(err, user) {
    if(err) {
      if(err.toString().indexOf('E11000') > -1) {
        err = new Error('Duplicate Username');
      }
      res.status(400);
      return res.send({reason:err.toString()});
    }
    console.log(user);
    res.send(user);
   /* req.logIn(user, function(err) {
      if(err) {return next(err);}
      res.send(user);
    })*/
  });
};

exports.getStudentDetails = function(req, res) {
  User.getStudentInfo(req.body.params.authtoken,function(err,result){
     res.send(result);
  });
};


exports.getUsersCount = function(req, res){
  User.getAllUsersCount(req.user, function(err,result){
     res.send(result);
  });
};

exports.getStudentList = function(req, res){
  User.getStudentsList(req.user, function(err,result){
     res.send(result);
  });
};

exports.getStudentInfo = function(req, res){
  
    console.log("n\n\naaaa",req);
   User.getStudentProfileInfo (req.user.user_id,function(err,result){
    console.log("n\n\naaaa",result);
     res.send(result);
  });
};

exports.getPaperList = function(req, res){
  User.getPaperList(req.body.params.program_id,function(err,result){
     res.send(result);
  });
};

exports.studentOpportunity = function(req, res){
  User.registerStudent(req.body.params.paper_info,req.user.user_id,function(err,result){
     res.send(result);
  });
};

exports.updateProfileInfo =  function(req, res){
    User.updateProfile(req.body.profile,function(err,result){
        res.send(result);
    });
};

exports.getSessionListStudent =  function(req, res){
    User.getSessionListStudent(req.user.user_id,function(err,result){
        res.send(result);
    });
};