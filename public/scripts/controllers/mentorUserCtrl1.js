'use strict';

/**
 * @ngdoc overview
 * @name mstApp
 * @description
 * # mstAp
 */
angular.module('myApp').controller('MentorsCtrl1', ['$scope','mentorServices1','$state', function($scope,mentorServices1,$state) {
	$scope.mentors1;

	$scope.loading = true;
	$scope.getMentorsList1 = function(){
        mentorServices1.getMentors()
            .then(function (response) {
                $scope.mentors1 = response.data;
                console.log(JSON.stringify($scope.mentors1));
                // $scope.loading = false;
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
	
    }

    $scope.getMentorsList1();
    
}]);