angular.module('myAdminApp').factory('adminServices', function($http, $q, $rootScope) {
	var urlBase = '/api/getalluserscount',
        dataFactory = {};

    dataFactory.getUsersListTotal = function() {
          return $http.post(urlBase,{params:{role_id:$rootScope.identity.currentUser.role_id,user_id:$rootScope.identity.currentUser.user_id}});
    }

    return dataFactory;

});