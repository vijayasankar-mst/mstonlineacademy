var postgres = require('../config/postgres'),
    encrypt = require('../utilities/encryption'),
    User = exports,
	salt,
	ps = new postgres(global.dbvars);


User.save = function(req, callback) {
    console.log('saving the new User');
    var email = req.body.email;
    var password = req.body.password;
    console.log( email, password);
    var local = 'local';
    var sql = 'INSERT INTO (email, password, account_type) VALUES ($1, $2, $3) RETURNING u_id';
    var data = [
        req.body.email,
        req.body.password,
        local
    ];
    console.log(data);
    postgres.client.query(sql, data, function(err, result){
        if (err) {
            console.error('error in adding new user', err);

        }
        //consoles the id number we are at
        console.log('Insert result:', result.rows);
        console.log(User);
    console.log("checked", data);
    
    var userData= {
        id: result.rows[0].u_id
    };
    callback(userData);
    });

};
