var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');


module.exports = function(app, config) {

  app.set('views', config.rootPath + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');

  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(session({secret: 'online academy',resave:false,saveUninitialized:false}));

  app.use(passport.initialize());
  app.use(passport.session());
 
  app.use(express.static(config.rootPath + '/public'));

}