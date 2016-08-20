angular.module('myApp').factory('mentorServices1', function ($http, $q) {
    var urlBase = '/api/mentorusers',
            UrlBaseMentor = '/api/mentorTopusers';
    var dataFactory = {};

    dataFactory.getMentors = function () {
        return $http.get(urlBase);
    }

    return dataFactory;

});


