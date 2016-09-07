angular.module('myAdminApp').factory('studentServices', function ($http) {
    var dataFactory = {};

    dataFactory.getStudentsList = function () {
        return $http.get('/api/studentusers');
    }

    dataFactory.getSessionListStudent = function () {
        return $http.get('/api/getsessionlistforstudent');
    }

    return dataFactory;

});