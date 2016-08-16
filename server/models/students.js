var postgres = require('../config/postgres'),
    encrypt = require('../utilities/encryption'),
    User = exports,
	salt,
	ps = new postgres(global.dbvars);


User.create = function(studentinfo, callback) {
    console.log('saving the new User');
    var authToken = studentinfo.authToken;
    var email = studentinfo.email;
    var password = studentinfo.password;
    var phone =  studentinfo.phone;
    var username = studentinfo.username;
    var role_id = studentinfo.role_id;
    var is_active = "t";
    var local = 'local';

    var sql = "with new_user as (INSERT INTO users(unique_id, username,email,role_id,is_active) VALUES ($1, $2, $3,$4,$5) returning user_id), user_pass as (INSERT INTO user_passwords(user_id, hashed_password, is_active) VALUES ((select user_id from new_user),$6,$5) returning user_password_id), lead_upd as (UPDATE salesforce.lead SET status='Closed - Converted' WHERE sfid=$1) select * from new_user";
    var data = [authToken,username,email,role_id, is_active,password];
    var command = {"sql" : sql, "params" : data}
    ps.query(command, function(err, result){
        
    console.log("resu : ",result);
    console.log("resuLen : ",result.length);
        if (err) {
             console.error('error in adding new user', err);
             return callback(err, this);
        }
        if (result.length > 0) {
            return callback(false, data);
        }
        else {
            return callback(true, null);
        }
    });

};


User.getStudentInfo = function(tokenid, callback) {
    var sql = 'SELECT firstname,lastname,email,company,phone FROM salesforce.lead WHERE sfid = $1';
    data = [tokenid];
    var command = {"sql" : sql, "params" : data}
    ps.query(command, function (err, result) {
        if (err) {
            console.error(err);
            return callback(err, this);
        }
       
        if (result.length > 0) {
        }
        else {
            return callback(false, null);
        }
        var data =  result;
        return callback(false, data);
    }); 
};


User.getAllUsersCount = function(callback){
    var sql = "SELECT (SELECT count(a.user_id) FROM users a WHERE a.role_id = 1) as adminTotal, (SELECT count(a.user_id) FROM users a WHERE a.role_id = 2) as mentorTotal,(SELECT count(b.user_id) FROM users b WHERE b.role_id = 3) as studentTotal, (SELECT count(sfid) FROM salesforce.lead) as salesforceTotal FROM users LIMIT 1";
    data = [];
    var command = {"sql" : sql, "params" : data}
    ps.query(command, function (err, result) {
        if (err) {
            console.error(err);
            return callback(err, this);
        }
       
        if (result.length > 0) {
        }
        else {
            return callback(false, null);
        }
        var data =  result;
        return callback(false, data);
    }); 
};