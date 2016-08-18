var postgres = require('../config/postgres'),
encrypt = require('../utilities/encryption'),
User = exports,
salt,
ps = new postgres(global.dbvars);


User.create = function(studentinfo, callback) {
    console.log('saving the new User');
    console.log(studentinfo);
    var authToken = studentinfo.authToken;
    var email = studentinfo.email;
    var password = studentinfo.password;
    var phone =  studentinfo.phone;
    var username = studentinfo.username;
    var role_id = studentinfo.role_id;
    var street = studentinfo.street;
    var city = studentinfo.city;
    var postalcode = studentinfo.postalcode;
    var country = studentinfo.country;
    var Program__c = studentinfo.desiredprogram;
    var is_active = "t";
    var local = 'local';

    var sql = "with new_user as (INSERT INTO users(unique_id, username,email,role_id,is_active) VALUES ($1, $2, $3,$4,$5) returning user_id), user_pass as (INSERT INTO user_passwords(user_id, hashed_password, is_active) VALUES ((select user_id from new_user),$6,$5) returning user_password_id), lead_upd as (UPDATE salesforce.lead SET status='Closed - Converted', street=$7, city=$8,postalcode=$9,country=$10,Program__c=$11 WHERE sfid=$1) select * from new_user";
    var data = [authToken,username,email,role_id, is_active,password,street,city,postalcode,country,Program__c];
    var command = {"sql" : sql, "params" : data}
    ps.query(command, function(err, result){
        console.log(command);
        console.log("resu : ",result);
    // console.log("resuLen : ",result.length);
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


User.getAllUsersCount = function(userDetails,callback){
    switch (userDetails.role_id) {
        case 1: //Admin
        var sql = "SELECT (SELECT count(a.user_id) FROM users a WHERE a.role_id = 1) as adminTotal, (SELECT count(a.user_id) FROM users a WHERE a.role_id = 2) as mentorTotal,(SELECT count(b.user_id) FROM users b WHERE b.role_id = 3) as studentTotal, (SELECT count(sfid) FROM salesforce.lead) as salesforceTotal FROM users LIMIT 1";
        data = [];
        var command = {"sql" : sql, "params" : data};
        break;
        case 2: //mentor            
        var sql = "SELECT (SELECT COUNT(paper) FROM papers LEFT JOIN mentors USING (mentor_id) WHERE user_id = $1) as paperTotal, (SELECT COUNT(student_id) FROM student_details LEFT JOIN mentors USING (mentor_id) WHERE user_id = $1) as mentoringstudentstotal, (SELECT COUNT(student_id) FROM student_details) as studentstotal, (SELECT SUM(paper_cost) FROM papers LEFT JOIN mentors USING (mentor_id) WHERE user_id = $1) as papercostTotal FROM users LIMIT 1";
        data = [userDetails.user_id];
        var command = {"sql" : sql, "params" : data};
        break;
        default: //student
        var sql = "SELECT (SELECT count(a.user_id) FROM users a WHERE a.role_id = 1) as adminTotal, (SELECT count(a.user_id) FROM users a WHERE a.role_id = 2) as mentorTotal,(SELECT count(b.user_id) FROM users b WHERE b.role_id = 3) as studentTotal, (SELECT count(sfid) FROM salesforce.lead) as salesforceTotal FROM users LIMIT 1";
        data = [];
        var command = {"sql" : sql, "params" : data};
        break;
    }
    ps.query(command, function (err, result) {
        if (err) {
            console.error(err);
            return callback(err, this);
        }

        console.log("queser : ",result);

        if (result.length > 0) {
        }
        else {
            return callback(false, null);
        }
        var data =  result;
        return callback(false, data);
    }); 
};


User.getStudentsList = function(callback){
    var sql = "SELECT l.email, l.company, l.name, l.phone, l.firstname, l.lastname, l.createddate, l.city, l.postalcode FROM salesforce.lead l, users u WHERE u.unique_id = l.sfid ORDER BY l.createddate DESC";
    var command = {"sql" : sql, "params" : []}
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


User.getStudentInfo = function(userid,callback){
    var sql = "SELECT sc.firstname, sc.lastname, program_id, program, degree_id, degree, program_area_id, program_area, street, city, country, u.email, birthdate, sc.name, sc.phone FROM users u LEFT JOIN salesforce.lead sl ON (unique_id = sfid) LEFT JOIN salesforce.contact sc ON (sc.sfid = ConvertedContactId) LEFT JOIN programs ON (program_code__c = program_code) LEFT JOIN degree_program_area using (degree_program_area_id) LEFT JOIN degrees USING (degree_id) LEFT JOIN program_areas USING (program_area_id) WHERE u.user_id = $1";
    var command = {"sql" : sql, "params" : [userid]}
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


User.getPaperList = function(program_id,callback){
    var sql = "SELECT program_id, paper_id, paper, paper_code,paper_cost,m.mentor_id,m.first_name,m.last_name FROM papers p LEFT JOIN mentors m ON (p.mentor_id = m.mentor_id) WHERE p.program_id = $1";
    var command = {"sql" : sql, "params" : [program_id]}
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