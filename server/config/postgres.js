var pg = require('pg');
pg.defaults.ssl = true;
var _ = require("underscore")._;


var DB = function(config){
  global.dbvars = config;
  var connectionString = (process.env.DATABASE_URL || config.db);
  this.connectionString = connectionString;
};
 
DB.prototype.query = function (command, next) {

  command.params = command.params || [];
  //check to see if the params are an array, which they need to be 
  //for the pg module
  if(_.isObject(command.params)){
    //we only need the values from the object,
    //so swap it out
    command.params = _.values(command.params);
  }else if(!_.isArray(command.params)){
    command.params = [command.params];
  }
 
  pg.connect(this.connectionString, function (err, db, done) {
    db.query(command.sql, command.params, function (err, result) {
      done(db);
      if(err){
        next(err,null);
      }else{
        next(err, result.rows);
      }
    });
  });
};
 
DB.prototype.executeFunction = function(command, next){
  var sql = "select * from " + name;
  this.executeSingle({sql : command.sql,params : command.params},next);
};
 
DB.prototype.executeSqlFile = function(sqlFile,params,next){
  /*var self = this;
  console.log("Executing ", sqlFile);
  var sql = fs.readFileSync(sqlFile, {encoding: 'utf-8'});
  self.query({sql :sql, params : params}, function(err,res){
    if(next){
      next(err,self);
    }
  });*/
};
 
DB.prototype.executeSingle = function(command,next){
 
  this.query(command,function(err,result){
    if(err){
      next(err,null);
    }else{
      if(result.length === 0) {
        next(null,result);
      }else{
        next(null,result[0]);
      }
    }
  });
};
 




module.exports = DB;