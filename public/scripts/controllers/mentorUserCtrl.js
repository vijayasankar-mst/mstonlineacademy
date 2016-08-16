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
                $scope.loading = false;
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
	
    }

    $scope.addMentor = function(){
    	$state.go('dashboard.mentors.addnew')
    }

    $scope.cancel = function(){
    	$state.go('dashboard.mentors.list');
    }

   $scope.getMentorsList();
    
}]);