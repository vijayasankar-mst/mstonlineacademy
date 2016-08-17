var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('../models/User.js');

module.exports = function() {
  passport.use(new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
     },
    function(req,username, password, done) {
         console.log('local signin is starting');
             User.findOne(username, function(err, returningUser, data, user) {
            // if there are any errors, return the error before anything else
            var user = data;
            if (err) {
              return done(err);
            }
            // if no user is found, return the message
            if (!returningUser) {
               return done(null, false); // req.flash is the way to set flashdata using connect-flash
            }
            // if the user is found but the password is wrong
           
            if (returningUser === true && req.body.password !== user.hashed_password) {
               console.log('the user is found but the password does not match!');
               return done(null, false); // create the loginMessage and save it to session as flashdata
            }
            // all is well, return successful user
            else {
               //console.log('the user', user, 'should go to profile!');
               return done(null, user);
            }
            });
    }
  ));

  passport.serializeUser(function(user, done) {
    if(user) {
      var sessionUser = { user_id: user.user_id, username: user.username, role_id: user.role_id }
      done(null, sessionUser);
    }
  });

  passport.deserializeUser(function(sessionUser, done) {
   // User.findByUserId(id,function(err, user) {
      if(sessionUser) {
        return done(null, sessionUser);
      } else {
        return done(null, false);
      }
    //})
  })

}