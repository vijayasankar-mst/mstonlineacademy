'use strict';

/**
 * @ngdoc overview
 * @name mstApp
 * @description
 * # mstApp
 */
angular.module('myApp')
	.directive('sidebar',function(){
		return {
        templateUrl:'scripts/directives/sidebar/sidebar.html',
        restrict: 'E',
        replace: true,
    	}
	});


