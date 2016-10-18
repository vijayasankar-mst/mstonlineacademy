'use strict';
var myApp = angular.module('myApp');

myApp.directive('sidebar', function () {
    return {
        templateUrl: 'scripts/directives/sidebar/sidebar.html',
        restrict: 'E',
        replace: true,
    }
});

//requestform validataion
myApp.controller('requestformController', function ($scope, $http) {
    $scope.submitForm = function (isValid) {
        if (isValid) {
            alert('Thanks for submission!');
        }
    };

    $scope.registerURLVal = window.location.origin;
    $scope.retURLVal = window.location.href;

    $http.get("/api/getsalesforceorginfo").then(function (response) {
        $scope.sforgid = response.data.salesforceOrgID;
    });

    //Phone Number Regex
    $scope.phoneNumberPattern = /^(\(?\+?(\d{1,3})\)?[- ]?)?\d{3}[-\s\.]?\d{3}[-\s\.]?\d{4}$/;

    //ng-class attributes
    $scope.errorClass = function (control, method) {
        if ($scope.interestForm[control].$invalid && !$scope.interestForm[control].$pristine) {
            return (method == "class" ? 'has-error' : true);
        }
    };
});
