angular.module('myAdminApp').factory('paperServices', function($http, $q) {
	var urlBase = '/api/studentusers',
		urlPaper = '/api/getpaperlist',
     	dataFactory = {};

    dataFactory.getStudentPrgmInfo = function() {
    	return $http.get(urlBase);
    }

    dataFactory.getPaperLists = function(program_id) {
    	return $http.post(urlPaper,{params : {program_id : program_id}});
    }

    return dataFactory;

});