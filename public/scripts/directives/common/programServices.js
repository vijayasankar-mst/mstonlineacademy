angular.module('myApp').factory('programServices', function ($http) {
    var dataFactory = {};

    dataFactory.getDegreeList = function () {
        return $http.get('/api/getdegreelist');
    }

    dataFactory.getDegreePrograms = function (degreeid) {
        return $http.post('/api/getdegreeprogram', {params: {degreeid: degreeid}});
    }

    dataFactory.getDegreeProgramAreas = function (programid, degreeid) {
        return $http.post('/api/getdegreeprogramarea', {params: {programid: programid, degreeid: degreeid}});
    }

    dataFactory.getCourses = function (program_code) {
        return $http.post('/api/getCourses', {params: {program_code: program_code}});
    }

    dataFactory.getStudentDetails = function (authtoken) {
        return $http.post('/api/getstudentdetails', {params: {authtoken: authtoken}});
    }

    dataFactory.saveStudentInformation = function (studentdetails) {
        return $http.post('/api/v1/savestudentinformation', {params: {studentdetails: studentdetails}});
    }

    return dataFactory;

});