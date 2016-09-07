angular.module('myApp').factory('programServices', function ($http, $q) {
    var urlBase = '/api/getdegreelist',
            urlDegreePrgArea = '/api/getdegreeprogramarea',
            urlDegreeProgram = '/api/getdegreeprogram',
            urlGetStudent = '/api/getstudentdetails',
            urlSaveStudent = '/api/v1/savestudentinformation',
            urlGetCourse = '/api/getCourses',
            dataFactory = {};

    dataFactory.getDegreeList = function () {
        return $http.get(urlBase);
    }

    dataFactory.getDegreePrograms = function (degreeid) {
        return $http.post(urlDegreeProgram, {params: {degreeid: degreeid}});
    }

    dataFactory.getDegreeProgramAreas = function (programid, degreeid) {
        return $http.post(urlDegreePrgArea, {params: {programid: programid, degreeid: degreeid}});
    }

    dataFactory.getCourses = function (program_code) {
        return $http.post(urlGetCourse, {params: {program_code: program_code}});
    }


    dataFactory.getStudentDetails = function (authtoken) {
        return $http.post(urlGetStudent, {params: {authtoken: authtoken}});
    }

    dataFactory.saveStudentInformation = function (studentdetails) {
        return $http.post(urlSaveStudent, {params: {studentdetails: studentdetails}});
    }

    return dataFactory;

});