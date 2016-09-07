var postgres = require('../config/postgres'),
        programModel = exports,
        ps = new postgres(global.dbvars);

programModel.getDegreeList = function (callback) {
    var sql = 'SELECT * FROM degrees';
    var command = {"sql": sql, "params": {}}
    ps.query(command, function (err, result) {
        if (err) {
            console.error(err);
            return callback(err, this);
        }
        if (result.length > 0) {
        } else {
            return callback(false, null);
        }
        var data = result;
        return callback(false, data);
    });
};

programModel.getProgramAreaList = function (callback) {
    var sql = 'SELECT * FROM program_areas';
    var command = {"sql": sql, "params": {}}
    ps.query(command, function (err, result) {
        if (err) {
            console.error(err);
            return callback(err, this);
        }
        if (result.length > 0) {
        } else {
            return callback(false, null);
        }
        var data = result;
        return callback(false, data);
    });
};

programModel.getDegreeProgramList = function (degreeid, callback) {
    var sql = 'SELECT dpa.program_area_id, pa.program_area FROM program_areas  pa JOIN degree_program_area as dpa ON (pa.program_area_id = dpa.program_area_id AND dpa.degree_id = $1) ORDER BY dpa.program_area_id DESC ';
    data = [degreeid];
    var command = {"sql": sql, "params": data}
    ps.query(command, function (err, result) {
        if (err) {
            console.error(err);
            return callback(err, this);
        }
        if (result.length > 0) {
        } else {
            return callback(false, null);
        }
        var data = result;
        return callback(false, data);
    });
};

programModel.getDegreeProgramListArea = function (programid, degreeid, callback) {
    var sql = 'SELECT program, p.program_code FROM programs p LEFT JOIN degree_program_area USING (degree_program_area_id) WHERE degree_id = $2 AND program_area_id = $1';
    data = [programid, degreeid];
    var command = {"sql": sql, "params": data}
    ps.query(command, function (err, result) {
        if (err) {
            console.error(err);
            return callback(err, this);
        }
        if (result.length > 0) {
        } else {
            return callback(false, null);
        }
        var data = result;
        return callback(false, data);
    });
};

programModel.getProgramWithPaperCount = function (programid, degreeid, callback) {
    var sql = 'SELECT program_id, program, p.program_code,  count(paper) paper_count FROM programs p LEFT JOIN degree_program_area USING (degree_program_area_id) LEFT JOIN papers USING (program_id) WHERE degree_id = $2 AND program_area_id = $1 GROUP BY program_id';
    data = [programid, degreeid];
    var command = {"sql": sql, "params": data}
    ps.query(command, function (err, result) {
        if (err) {
            console.error(err);
            return callback(err, this);
        }
        if (result.length > 0) {
        } else {
            return callback(false, null);
        }
        var data = result;
        return callback(false, data);
    });
};

programModel.getCourses = function (programCode, callback) {
    var sql = 'SELECT paper_id, paper, paper_code FROM papers p LEFT JOIN programs pa USING (program_id) WHERE program_code = $1';
    data = [programCode];

    var command = {"sql": sql, "params": data}
    ps.query(command, function (err, result) {
        if (err) {
            console.error(err);
            return callback(err, this);
        }
        if (result.length > 0) {
        } else {
            return callback(false, null);
        }
        var data = result;
        return callback(false, data);
    });
};

programModel.getPapersWithMentors = function (programCode, callback) {
    var sql = "SELECT paper_id, paper, paper_code, paper_cost, CONCAT(first_name, ' ', last_name) as mentor_name, p.mentor_id, count(DISTINCT student_id) as students_count FROM papers p LEFT JOIN programs pa USING (program_id) LEFT JOIN mentors m USING (mentor_id) LEFT JOIN student_details sd USING (paper_id) WHERE program_code = $1 GROUP BY p.paper_id, mentor_name ORDER BY p.paper_id";

    data = [programCode];

    var command = {"sql": sql, "params": data}
    ps.query(command, function (err, result) {
        if (err) {
            console.error(err);
            return callback(err, this);
        }
        if (result.length > 0) {
        } else {
            return callback(false, null);
        }
        var data = result;
        return callback(false, data);
    });
};

programModel.savePaperEdit = function (paperID, paperName, paperCode, paperCost, mentorID, callback) {
    var sql = "UPDATE papers SET paper = $2, paper_code = $3, paper_cost = $4, mentor_id = $5 WHERE paper_id = $1";

    data = [paperID, paperName, paperCode, paperCost, mentorID];

    console.log('\n\nIn Edit area :', data);

    var command = {"sql": sql, "params": data}
    ps.query(command, function (err, result) {
        if (err) {
            console.error(err);
            return callback(err, this);
        }
        if (result.length > 0) {
        } else {
            return callback(false, null);
        }
        var data = result;
        return callback(false, data);
    });
};

programModel.savePaperNew = function (programCode, paperName, paperCode, paperCost, mentorID, callback) {
    var sql = "INSERT INTO papers (paper, program_id, paper_code, paper_cost, mentor_id) SELECT $2, program_id, $3, $4, $5 FROM programs WHERE program_code = $1 returning paper_id";

    data = [programCode, paperName, paperCode, paperCost, mentorID];

    console.log('\n\nIn Add area :', data);

    var command = {"sql": sql, "params": data}
    ps.query(command, function (err, result) {
        if (err) {
            console.error(err);
            return callback(err, this);
        }
        if (result.length > 0) {
        } else {
            return callback(false, null);
        }
        var data = result;
        return callback(false, data);
    });
};

programModel.deletePaper = function (paperID, callback) {
    var sql = "DELETE FROM papers WHERE paper_id = $1";

    data = [paperID];

    console.log('\n\nIn delete area :', data);

    var command = {"sql": sql, "params": data}
    ps.query(command, function (err, result) {
        if (err) {
            console.error(err);
            return callback(err, this);
        }
        if (result.length > 0) {
        } else {
            return callback(false, null);
        }
        var data = result;
        return callback(false, data);
    });
};

