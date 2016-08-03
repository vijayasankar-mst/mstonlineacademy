'use strict';

/**
 * @ngdoc overview
 * @name mstApp
 * @description
 * # mstApp
 */
angular.module('myApp')
	.directive('footer',function(){
		return {
        templateUrl:'scripts/directives/footer/footer.html',
        restrict: 'E',
        replace: true
    	}
	});


