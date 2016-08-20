angular.module('myAdminApp').factory('mentorServices', function($http, $q) {
	var urlBase = '/api/mentorusers';
    var dataFactory = {};

    dataFactory.getMentors = function() {
    	return $http.get(urlBase);
    }
    dataFactory.getMentorsStudents = function() {
        return $http.get('/api/mentorstudents');
    }

    return dataFactory;

});


