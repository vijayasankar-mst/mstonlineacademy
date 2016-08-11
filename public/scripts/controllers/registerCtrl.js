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
     $scope.studentdetails; 

     $scope.getDegreeList = function(){
         programServices.getDegreeList()
         .then(function (response) {
            $scope.degreelist = response.data;
        }, function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        });
     }

     $scope.getDegreeProgram = function(){
         programServices.getDegreePrograms($scope.registerFormData.desireddegree)
         .then(function (response) {
            $scope.degreeporgramlist = response.data;
        }, function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        });
     }

     $scope.getDegreeProgramArea = function(){
        programServices.getDegreeProgramAreas($scope.registerFormData.desiredprogram)
        .then(function (response) {
            $scope.degreeporgramarealist = response.data;
        }, function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        });
    }

    $scope.getUserInfoDetails = function(){
        if($stateParams.token !== undefined) {
            programServices.getStudentDetails($stateParams.token)
            .then(function (response) {
                console.log("test =", response.data);
                if(response.data.length > 0){
                 $scope.registerFormData = response.data[0];
             }else{
                 $scope.errMsg = true;
                 $scope.status = 'Token already authenticated ';
             }
         }, function (error) {
            $scope.errMsg = true;
            $scope.status = 'Token already authenticated ' + error.message;
        });
        }
    }

    $scope.submitForm = function(isValid){
        if(isValid) {
            $scope.registerFormData.authToken = $stateParams.token;
            $scope.registerFormData.role_id = 3;
            programServices.saveStudentInformation($scope.registerFormData)
            .then(function (response) {
                window.location.href = "index/thanks"
            }, function (error) {
             $scope.errMsg = true;
             $scope.status = 'Username Already Exists';
         });
        }
    }
    
    $scope.errorClass = function(control,method) {
        if($scope.studentRegisterForm[control].$invalid && !$scope.studentRegisterForm[control].$pristine) {
            return (method=="class"?'has-error':true);
        }
    }


    //Phone Number Regex
    $scope.phoneNumberPattern = /^(\(?\+?(\d{1,3})\)?[- ]?)?\d{3}[-\s\.]?\d{3}[-\s\.]?\d{4}$/;

});