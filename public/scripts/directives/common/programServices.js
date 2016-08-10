angular.module('myApp').factory('programServices', function($http, $q) {
	var urlBase = '/api/getdegreelist',
        urlDegreePrgArea = '/api/getdegreeprogramarea',
        urlDegreeProgram = '/api/getdegreeprogram',
        dataFactory = {};

    dataFactory.getDegreeList = function() {
    	return $http.get(urlBase);
    }

    dataFactory.getDegreePrograms = function(degreeid) {
        return $http.post(urlDegreeProgram,{ params: { degreeid: degreeid} });
    }

    dataFactory.getDegreeProgramAreas = function(programid) {
        return $http.post(urlDegreePrgArea,{ params: { programid: programid} });
    }

    return dataFactory;

});