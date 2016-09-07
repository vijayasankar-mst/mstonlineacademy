var postgres = require('../config/postgres'),
        encrypt = require('../utilities/encryption'),
        User = exports,
        salt,
        ps = new postgres(global.dbvars);


User.findOne = function (username, callback) {
    var isNotAvailable = false; //we are assuming the email is taking
    //check if there is a user available for this email;
    var sql = 'SELECT * FROM users u LEFT JOIN user_passwords up using (user_id) WHERE LOWER(username)=$1 AND up.is_active = true AND u.is_active= true';
    var data = [username];
    var command = {"sql": sql, "params": data}
    ps.query(command, function (err, result) {
        if (err) {
            console.error(err);
            return callback(err, isNotAvailable, this);
        }
        if (result.length > 0) {
            isNotAvailable = true; // update the user for return in callback
            console.log(username + ' is found in the database!');
        } else {
            isNotAvailable = false;
            console.log(username + ' is not available');
            return callback(false, isNotAvailable, null);
        }
        var data = result[0];

        return callback(false, isNotAvailable, data);
    });
};

User.findByUserId = function (userid, callback) {
    var isNotAvailable = false; //we are assuming the email is taking
    var sql = 'SELECT * FROM users WHERE (user_id = $1)';
    var data = [userid];
    var command = {"sql": sql, "params": data}
    ps.query(command, function (err, result) {
        if (err) {
            console.error(err);
            return callback(err, isNotAvailable, this);
        }
        if (result.length > 0) {
            isNotAvailable = true; // update the user for return in callback
        } else {
            isNotAvailable = false;
            return callback(false, isNotAvailable, null);
            console.log(username + ' is not available');
        }
        var data = result[0];

        return callback(false, isNotAvailable, data);
    });
};


User.localfindOne = function (username, password, callback) {
    var returningUser = false; //we are assuming the email is taking
    //console.log(password);
    console.log(username + ' is in the findOne function test');
    //check if there is a user available for this email;
    var sql = 'SELECT u.* FROM users u, user_passwords p WHERE (u.username = $1 AND p.hashed_password = $2 AND u.user_id = p.user_id)';
    var data = [username, password];
    var command = {"sql": sql, "params": data}
    console.log("password = ", password);
    ps.query(command, function (err, result) {
        if (err) {
            console.error(err);
            return callback(err, returningUser, this);
        }
        if (result.length > 0) {
            returningUser = true; // update the user for return in callback
            ///email = email;
            //password = result.rows[0].password;
            console.log(username + ' is found in the database!');
        } else {
            returningUser = false;
            console.log(username + ' is available');
            //return callback(false);
            return callback(false, returningUser, null);
            //email = email;

        }

        var data = {
            id: result[0].id
        };
        return callback(false, returningUser, data);
    });
};


User.validPassword = function (passwordToMatch) {
    console.log(passwordToMatch);
    //return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
};
