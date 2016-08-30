angular.module('myAdminApp').factory('adminServices', function($http, $q, $rootScope) {
	var urlBase = '/api/getalluserscount',
  urlGetStudent = '/api/getstudentinfo',
  urlDegreePrgArea = '/api/getdegreeprogramarea',
  urlDegreeProgram = '/api/getdegreeprogram',
  urlGetStudent = '/api/getstudentdetails',
  urlGetPaperMentor = '/api/getpaperswithmentors',
  urlGetProgramWithPaperCount = '/api/getprogramswithpapercount',
  dataFactory = {};

  dataFactory.getUsersListTotal = function() {
      return $http.get(urlBase);
  };

  dataFactory.getStudentInfo = function(){
    return $http.get(urlGetStudent);
};

dataFactory.getMentorSession = function(){
    return $http.get('api/getmentorsession');
};

dataFactory.getDegreeList = function() {
    return $http.get('/api/getdegreelist');
}

dataFactory.getDegreePrograms = function(degreeid) {
    return $http.post(urlDegreeProgram,{ params: { degreeid: degreeid} });
}

dataFactory.getDegreeProgramAreas = function(programid, degreeid) {
    return $http.post(urlDegreePrgArea,{ params: { programid: programid, degreeid : degreeid} });
}

dataFactory.getProgramWithPaperCount = function(programid, degreeid) {
    return $http.post(urlGetProgramWithPaperCount,{ params: { programid: programid, degreeid : degreeid} });
}

dataFactory.getPapersWithMentors = function(program_code) {
    return $http.post(urlGetPaperMentor,{ params: { program_code: program_code } });
}

return dataFactory;

});