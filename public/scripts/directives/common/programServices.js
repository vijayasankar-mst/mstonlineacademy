angular.module('myApp').factory('programServices', function($http, $q) {
	var urlBase = '/api/getdegreelist',
        urlDegreePrgArea = '/api/getdegreeprogramarea',
        urlDegreeProgram = '/api/getdegreeprogram',
        urlGetStudent = '/api/getstudentdetails',
        urlSaveStudent = '/api/v1/savestudentinformation',
        urlGetCourse = '/api/getCourses',
        dataFactory = {};

    dataFactory.getDegreeList = function() {
    	return $http.get(urlBase);
    }

    dataFactory.getDegreePrograms = function(degreeid) {
        return $http.post(urlDegreeProgram,{ params: { degreeid: degreeid} });
    }

    dataFactory.getDegreeProgramAreas = function(programid) {
        return $http.post(urlDegreePrgArea,{ params: { programid: programid} });
    }
    
      dataFactory.getCourses = function(programareaid) {
        return $http.post(urlGetCourse,{ params: { programareaid: programareaid } });
    }
    

    dataFactory.getStudentDetails = function(authtoken) {
          return $http.post(urlGetStudent,{ params: { authtoken: authtoken} });
    }

    dataFactory.saveStudentInformation = function(studentdetails) {
          return $http.post(urlSaveStudent,{ params: { studentdetails: studentdetails} });
    }

    return dataFactory;

});