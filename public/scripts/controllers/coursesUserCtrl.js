'use strict';

angular.module('myAdminApp').controller("CoursesCtrl", function($ocLazyLoad,$scope,$state,$rootScope,adminServices,$stateParams) {
 $scope.degreelist;
 $scope.degreeporgramlist;
 $scope.degreeprogramarealist;
 $scope.registerFormData;
 $scope.studentdetails; 
 $scope.loadingD;
 $scope.loadingP;
 $scope.loadingPA;
 $scope.loadingC;

 $scope.getDegreeList = function(){
  $scope.loadingD = $scope.loading = true;
  adminServices.getDegreeList()
  .then(function (response) {
    $scope.degreelist = response.data;
    $scope.loadingD = $scope.loading = false;
  }, function (error) {
    $scope.status = 'Unable to load customer data: ' + error.message;
  });
}

$scope.getDegreeProgram = function(){
  $scope.loadingPA =  $scope.loading = true;
  adminServices.getDegreePrograms($scope.registerFormData.desireddegree)
  .then(function (response) {
    $scope.degreeporgramlist = response.data;
    $scope.loadingPA =  $scope.loading = false;
  }, function (error) {
    $scope.status = 'Unable to load customer data: ' + error.message;
  });
}

$scope.getDegreeProgramArea = function(){
  $scope.loadingP =  $scope.loading = true;
  adminServices.getDegreeProgramAreas($scope.registerFormData.desiredprogramarea,$scope.registerFormData.desireddegree)
  .then(function (response) {
    $scope.degreeporgramarealist = response.data;
    $scope.loadingP =  $scope.loading = false;
  }, function (error) {
    $scope.status = 'Unable to load customer data: ' + error.message;
  });
}

$scope.getProgramWithPaperCount = function(){
  $scope.loadingP =  $scope.loading = true;
  adminServices.getProgramWithPaperCount($scope.registerFormData.desiredprogramarea,$scope.registerFormData.desireddegree)
  .then(function (response) {
    $scope.degreeporgramAreas = response.data;
    $scope.loadingP =  $scope.loading = false;
  }, function (error) {
    $scope.status = 'Unable to load customer data: ' + error.message;
  });
}

$scope.getPapersWithMentors = function(){
  $scope.loadingPAP = $scope.loading = true;
  adminServices.getPapersWithMentors($scope.registerFormData.desiredprogram)
  .then(function (response) {
    $scope.loadingPAP = $scope.loading = false;
    $scope.papers = response.data;
  }, function (error) {
    $scope.status = 'Unable to load customer data: ' + error.message;
  });
}


});