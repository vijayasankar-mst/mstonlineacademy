angular.module('myAdminApp').factory('mentorServices', function($http, $q) {
	var urlBase = '/api/mentorusers';
    var dataFactory = {};

    dataFactory.getMentors = function() {
    	return $http.get(urlBase);
    }

    return dataFactory;

});


