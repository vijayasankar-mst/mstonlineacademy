angular.module('myAdminApp').factory('adminServices', function($http, $q, $rootScope) {
	var urlBase = '/api/getalluserscount',
		urlGetStudent = '/api/getstudentinfo',
        dataFactory = {};

    dataFactory.getUsersListTotal = function() {
          return $http.get(urlBase);
    };

    dataFactory.getStudentInfo = function(){
		return $http.get(urlGetStudent);
    };

    return dataFactory;

});