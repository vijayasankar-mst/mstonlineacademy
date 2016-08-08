'use strict';

/**
 * @ngdoc directive
 * @name MST
 * @description
 * # adminPostFooter
 */
angular.module('myAdminApp')
	.directive('topnav',function(){
		return {
        templateUrl:'scripts/directives/admin/navigation/topnav.html',
        restrict: 'E',
        replace: true,
    	}
	});


