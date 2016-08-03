'use strict';

/**
 * @ngdoc overview
 * @name mstApp
 * @description
 * # mstAp
 */
angular.module('myApp')
	.directive('header',function(){
		return {
        templateUrl:'http://localhost:3060/scripts/directives/header/header.html',
        restrict: 'E',
        replace: true,
        scope:false
    	}
	});