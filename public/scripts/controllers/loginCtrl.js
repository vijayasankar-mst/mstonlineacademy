'use strict';

/**
 * @ngdoc overview
 * @name mstApp
 * @description
 * # mstAp
 */

angular.module('myAdminApp').controller("loginController", function ($ocLazyLoad, $scope, $state, mstUser, mstIdentity, mstAuth, $rootScope) {
    $scope.formData;
    $scope.identity = mstIdentity;
    $scope.submitForm = function () {
        $scope.dataLoading = true;
        mstAuth.authenticateUser($scope.formData.username, $scope.formData.password).then(function (success) {
            if (success) {
                if ($scope.identity.currentUser.role_id == 3) {
                    $state.go("dashboard.profile");
                } else {
                    $state.go("dashboard.home");
                }
            } else {
                $scope.error = 'Username or password is incorrect';
                $scope.dataLoading = false;
            }
        });
    }

});