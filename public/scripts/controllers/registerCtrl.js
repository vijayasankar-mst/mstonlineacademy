'use strict';

/**
 * @ngdoc overview
 * @name mstApp
 * @description
 * # mstAp
 */

angular.module('myApp').controller("RegisterCtrl", function($ocLazyLoad,$scope,$state,$rootScope,programServices,$stateParams) {
 $scope.degreelist;
 $scope.degreeporgramlist;
 $scope.degreeprogramarealist;
 $scope.registerFormData;

 console.log( $stateParams);

    $scope.getDegreeList = function(){
         programServices.getDegreeList()
            .then(function (response) {
              console.log(response.data);
                $scope.degreelist = response.data;
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }

    $scope.getDegreeProgram = function(){
       programServices.getDegreePrograms($scope.registerFormData.desireddegree)
            .then(function (response) {
              console.log(response.data);
                $scope.degreeporgramlist = response.data;
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }

    $scope.getDegreeProgramArea = function(){
        programServices.getDegreeProgramAreas($scope.registerFormData.desiredprogram)
            .then(function (response) {
              console.log(response.data);
                $scope.degreeporgramarealist = response.data;
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }


    $scope.getDegreeList(); 
  
});