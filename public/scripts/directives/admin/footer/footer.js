'use strict';

/**
 * @ngdoc directive
 * @name MST
 * @description
 * # adminPostFooter
 */
angular.module('myAdminApp')
	.directive('footerdir',function(){
		return {
        templateUrl:'scripts/directives/admin/footer/footer.html',
        restrict: 'E',
        replace: true,
    	}
	});


