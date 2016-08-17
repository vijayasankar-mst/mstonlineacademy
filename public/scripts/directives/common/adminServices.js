angular.module('myAdminApp').factory('adminServices', function($http, $q, $rootScope) {
	var urlBase = '/api/getalluserscount',
        dataFactory = {};

    dataFactory.getUsersListTotal = function() {
          return $http.get(urlBase);
    }

    return dataFactory;

});