'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('myAdminApp')
  .controller('MainCtrl', function($scope,mstAuth,$location,mstIdentity,$ocLazyLoad,$timeout,$rootScope,$state,adminServices,$http) {
  		$scope.loading = true;
      var studentinfo = {};

      if(!$rootScope.authenticated) {
         $rootScope.identity = mstIdentity;
      }

  	 $scope.signout = function() {
		    mstAuth.logoutUser().then(function() {
		       window.location.href="/site/login";
		    })
  		}

     	$scope.$on('$viewContentLoaded', function(event) {
			$timeout(function() {
				    $ocLazyLoad.load(['vendor/iCheck/icheck.min.js','scripts/common/custom.js']);
			 },0);
	   });


     $scope.getDashoard = function(){
      	 adminServices.getUsersListTotal()
            .then(function (response) {
                $scope.totalUserCount = response.data[0];
                $scope.loading = false;
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
  	};


    $scope.getStudentInfo = function(){
        adminServices.getStudentInfo()
            .then(function (response) {
                $rootScope.identity.currentUser.studentinfo = response.data[0];
                console.log(angular.toJson($rootScope.identity.currentUser));
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    };
  $scope.updateStudentRecord = function(){
      console.log('updated - '+angular.toJson($rootScope.identity.currentUser));
      return $http.post('/api/editProfile',{profile : $rootScope.identity.currentUser})
          .then(  function (response) {
             // $state.go('dashboard.mentors.list');
              return "data saved "  },
          function (httpError) { throw httpError.status + " : " +  httpError.data;    });
  }

    if($rootScope.identity.currentUser.role_id == 3) {
           $scope.getStudentInfo();
    }

  	$scope.getDashoard();

  });
