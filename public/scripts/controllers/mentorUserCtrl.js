'use strict';
/**
 * @ngdoc overview
 * @name mstApp
 * @description
 * # mstAp
 */
 angular.module('myAdminApp').controller('MentorsCtrl', ['$scope','mentorServices','$state','$http', function($scope,mentorServices,$state,$http) {
   $scope.mentors;
   $scope.mentorObject={};
   $scope.sessionObj={};
   $scope.loading = true;
   $scope.getMentorsList = function(){
    mentorServices.getMentors()
    .then(function (response) {
        $scope.mentors = response.data;
                //console.log(angular.toJson($scope.mentors));
                $scope.loading = false;
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
}
$scope.getMentorsStudentList = function(){
    mentorServices.getMentorsStudents()
    .then(function (response) {
        $scope.mentors = response.data;
                //console.log(angular.toJson($scope.mentors));
                $scope.loading = false;
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
}
$scope.addMentor = function(){
   $state.go('dashboard.mentors.addnew')
}
$scope.addNewMentor = function(){
    console.log(angular.toJson($scope.mentorObject));
    console.log('adding new mentor');
    return $http.post('/api/addNewMentor',{mentor : $scope.mentorObject })
    .then(  function (response) {
        $state.go('dashboard.mentors.list');
        return "data saved "  },
        function (httpError) { throw httpError.status + " : " +  httpError.data;    });
}

$scope.addMentorSession = function(){
    console.log(angular.toJson($scope.sessionObj));
    return $http.post('/api/mentorsession',{sessionDetails : $scope.sessionObj })
    .then(  function (response) {
        $state.go('dashboard.mentors.home');
        return "Session added"  },
        function (httpError) { throw httpError.status + " : " +  httpError.data;    });
}

$scope.getPaperListMentor = function(){
     mentorServices.getPaperListMentor()
     .then(function (response) {
      $scope.paperlistmentor = response.data;
    }, function (error) {
      $scope.status = 'Unable to load paper data : ' + error.message;
    });
   }

$scope.setGenderValue = function(val){
    $scope.mentorObject.gender=val;
}
$scope.cancel = function(){
   $state.go('dashboard.mentors.list');
}

$scope.getMentorsList();
$scope.getMentorsStudentList();
}]);