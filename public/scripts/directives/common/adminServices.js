angular.module('myAdminApp').factory('adminServices', function($http, $q) {
	var urlBase = '/api/getalluserscount',
        dataFactory = {};

    dataFactory.getUsersListTotal = function() {
          return $http.get(urlBase);
    }


    return dataFactory;

});