var postgres = require('../config/postgres'),
encrypt = require('../utilities/encryption'),
User = exports,
salt,
ps = new postgres(global.dbvars);

User.getUserList = function(roleid,callback) {
    var sql = "SELECT CONCAT(first_name, ' ', last_name) mentor_name, email, gender, birthdate, mentor_id FROM users LEFT JOIN mentors USING (user_id) WHERE role_id = $1";
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

User.getPaperListMentor = function(userid,callback) {
    var sql = 'SELECT paper_id, paper FROM papers LEFT JOIN mentors USING (mentor_id) WHERE user_id = $1 '; 
    data = [userid];
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

User.getTopMentors = function(callback) {
    var sql = "SELECT count(mentor_id) students_count, CONCAT(first_name, ' ', last_name) as mentor_name FROM student_details LEFT JOIN mentors USING (mentor_id) GROUP BY mentor_id, mentor_name ORDER BY students_count DESC LIMIT 10";
    var command = {"sql" : sql}
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


User.getLatestStudents = function(callback) {
    var sql = "SELECT DISTINCT student_id, c.name, program FROM (SELECT student_id FROM student_details ORDER BY student_detail_id DESC) s LEFT JOIN users u ON s.student_id = u.user_id LEFT JOIN salesforce.lead l ON u.unique_id = l.sfid LEFT JOIN salesforce.contact c ON l.convertedcontactid = c.sfid LEFT JOIN programs p ON c.program_code__c = p.program_code LIMIT 10"; 
    var command = {"sql" : sql}
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

User.getStudentList = function(roleid,callback) {
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

User.addNewMentor = function(mentorObj,callback) {
    console.log('from mentor file'+JSON.stringify(mentorObj))
    //var sql = 'insert into mentors (first_name,last_name,middle_name,gender,birthdate,user_id) values ($1,$2,$3,$4,$5,(select user_id from new_mentor))';

    var sql = "with new_mentor as (INSERT INTO users(unique_id, username,email,role_id,is_active) VALUES ($1, $2, $3,$4,$5)" +
    " returning user_id), user_pass as (INSERT INTO user_passwords(user_id, hashed_password, is_active) " +
    "VALUES ((select user_id from new_mentor),$6,$7) returning user_password_id), " +
    "mentor_add as (insert into mentors (first_name,last_name,middle_name,gender,birthdate,user_id) values ($8,$9,$10,$11,$12,(select user_id from new_mentor))) select * from new_mentor";
    var d = new Date();
    var data= [d.getTime(),mentorObj.username,mentorObj.email,2,'t',mentorObj.password,'t',mentorObj.firstname,mentorObj.lastname,
    mentorObj.midname,mentorObj.gender,mentorObj.dob];

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

User.addMentorSession = function(sessionDetails, userid, callback) {

    var sql = "INSERT INTO sessions (session, mentor_id, paper_id,session_date,join_url) SELECT $1, mentor_id, $3, $4, $5 FROM mentors WHERE user_id = $2 returning session_id";

    data = [sessionDetails.SessionName, userid,sessionDetails.paperId, sessionDetails.Date, sessionDetails.joinUrl];
    var command = {"sql" : sql, "params" : data}
    ps.query(command, function (err, result) {
        if (err) {
            console.error(err);
            return callback(err, this);
        }
        if (result.length > 0) {
            console.log(result);
        }
        else {
            return callback(false, null);
        }
        var data =  result;
        return callback(false, data);
    });
};

User.getMentorSession = function(userid, callback) {

    var sql = "SELECT session, session_date, paper, paper_code, session_id, join_url FROM sessions s LEFT JOIN mentors m USING (mentor_id) LEFT JOIN papers p USING (paper_id) WHERE user_id = $1 AND s.has_completed = false AND s.is_active = true ORDER BY session_date";
    data = [userid];
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

User.markSessionCompleted = function(sessionID, callback) {
 var sql = "UPDATE sessions SET has_completed = true WHERE session_id = $1 returning session";
 data = [sessionID];
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