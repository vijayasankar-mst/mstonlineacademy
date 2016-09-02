angular.module('myAdminApp').factory('adminServices', function($http, $q, $rootScope) {
	var urlBase = '/api/getalluserscount',
  urlGetStudent = '/api/getstudentinfo',
  urlDegreePrgArea = '/api/getdegreeprogramarea',
  urlDegreeProgram = '/api/getdegreeprogram',
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

dataFactory.getProgramAreaList = function() {
    return $http.get('/api/getprogramarealist');
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

dataFactory.savePaperEdit = function(paperID, paperName, paperCode, paperCost, mentorID) {
    return $http.post('/api/savepaperedit',{ params: { paperID : paperID, paperName : paperName, paperCode : paperCode, paperCost : paperCost, mentorID : mentorID} });
}

dataFactory.savePaperNew = function(programCode, paperName, paperCode, paperCost, mentorID) {
    return $http.post('/api/savepapernew',{ params: { programCode : programCode, paperName : paperName, paperCode : paperCode, paperCost : paperCost, mentorID : mentorID } });
}

dataFactory.deletePaper = function(paperID) {
    return $http.post('/api/deletepaper',{ params: { paperID : paperID} });
}

dataFactory.getTopMentors = function () {
    return $http.get('/api/gettopmentors');
}

dataFactory.getLatestStudents = function () {
    return $http.get('/api/getlateststudents');
}

return dataFactory;

});