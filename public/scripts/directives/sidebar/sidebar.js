'use strict';

/**
 * @ngdoc overview
 * @name mstApp
 * @description
 * # mstApp
 */

 var myApp = angular.module('myApp');

 myApp.directive('sidebar',function(){
 	return {
 		templateUrl:'scripts/directives/sidebar/sidebar.html',
 		restrict: 'E',
 		replace: true,
 	}
 });

 //requestform validataion
 myApp.controller('requestformController', function($scope) {
 	$scope.submitForm = function(isValid) {
 		if (isValid) {
 			alert('Thanks for submission!');
 		}
 	};

 	//Phone Number Regex
 	$scope.phoneNumberPattern = /^(\(?\+?(\d{1,3})\)?[- ]?)?\d{3}[-\s\.]?\d{3}[-\s\.]?\d{4}$/;

 	//ng-class attributes
 	$scope.errorClass = function(control) {
 		if($scope.interestForm[control].$invalid && !$scope.interestForm[control].$pristine) {
 			return 'has-error';
 		}
 	};
 });