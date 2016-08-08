var postgres = require('../config/postgres'),
    encrypt = require('../utilities/encryption'),
    User = exports,
	salt,
	ps = new postgres(global.dbvars);

User.getUserList = function(roleid,callback) {
    var sql = 'SELECT * FROM users WHERE (role_id = $1)';
    data = [roleid];
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