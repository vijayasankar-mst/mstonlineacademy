'use strict';

/**
 * @ngdoc overview
 * @name mstApp
 * @description
 * # mstAp
 */
angular.module('myAdminApp').controller('MentorsCtrl', ['$scope','mentorServices','$state', function($scope,mentorServices,$state) {
	$scope.mentors;

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
    $scope.invokeDataTables=function(index){
        console.log("repeat completed" + index) ;
    }
    $scope.addMentor = function(){
    	$state.go('dashboard.mentors.addnew')
    }

    $scope.cancel = function(){
    	$state.go('dashboard.mentors.list');
    }

   $scope.getMentorsList();
    
}]);