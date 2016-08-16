'use strict';

/**
 * @ngdoc overview
 * @name mstApp
 * @description
 * # mstAp
 */
angular.module('myAdminApp').controller('studentsCtrl', ['$scope','studentServices','$state', function($scope,studentServices,$state) {
	$scope.students;

	$scope.loading = true;
	$scope.getStudentsList = function(){
        studentServices.getStudentsList()
            .then(function (response) {
                $scope.students = response.data;
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

   $scope.getStudentsList();
    
}]);