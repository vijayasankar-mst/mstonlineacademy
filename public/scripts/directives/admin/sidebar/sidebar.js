'use strict';

/**
 * @ngdoc directive
 * @name MST
 * @description
 * # adminPostFooter
 */
angular.module('myAdminApp')
        .directive('leftsidebar', function () {
            return {
                templateUrl: 'scripts/directives/admin/sidebar/leftsidebar.html',
                restrict: 'E',
                replace: true,
            }
        });


