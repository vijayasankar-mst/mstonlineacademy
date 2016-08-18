'use strict';

/**
 * @ngdoc overview
 * @name mstApp
 * @description
 * # mstAp
 */
angular.module('myAdminApp').controller('papersCtrl', ['$scope','paperServices','$state','$rootScope', function($scope,paperServices,$state,$rootScope) {   
    $scope.papers;
    $scope.loading = true;
    $scope.getPaperList = function(){
          var program_id = $rootScope.identity.currentUser.studentinfo.program_id;
          paperServices.getPaperLists(program_id)
            .then(function (response) {
               $scope.papers = response.data;
               $scope.loading = false;
            }, function (error) {
              
           });
    };

    $scope.getPaperList();

}]);