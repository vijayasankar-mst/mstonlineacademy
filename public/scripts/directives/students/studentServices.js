angular.module('myAdminApp').factory('studentServices', function ($http, $q) {
    var urlBase = '/api/studentusers';
    var dataFactory = {};

    dataFactory.getStudentsList = function () {
        return $http.get(urlBase);
    }

    dataFactory.getSessionListStudent = function () {
        return $http.get('/api/getsessionlistforstudent');
    }

    return dataFactory;

});