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
  })
};

exports.getStudentDetails = function(req, res) {
  User.getStudentInfo(req.body.params.authtoken,function(err,result){
     res.send(result);
  });
}