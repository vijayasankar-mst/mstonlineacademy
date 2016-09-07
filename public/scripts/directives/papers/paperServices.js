angular.module('myAdminApp').factory('paperServices', function ($http, $q) {
    var urlBase = '/api/studentusers',
            urlPaper = '/api/getpaperlist',
            urlOpportunity = '/api/studentopportunity',
            dataFactory = {};

    dataFactory.getStudentPrgmInfo = function () {
        return $http.get(urlBase);
    }

    dataFactory.getPaperLists = function (program_id) {
        return $http.post(urlPaper, {params: {program_id: program_id}});
    }

    dataFactory.saveStudentOpportunity = function (paper_details) {
        return $http.post(urlOpportunity, {params: {paper_info: paper_details}});
    }

    return dataFactory;

});