angular.module('myAdminApp').factory('mstAuth', function($http, mstIdentity, $q, mstUser) {
	return {
		authenticateUser: function(username, password) {
	      var dfd = $q.defer();
	      var urlAuthentication = 'api/v1/authenticate';
	      $http.post(urlAuthentication, {username:username, password:password}).then(function(response) {
	        if(response.data.success) {
	          var user = new mstUser();
	          angular.extend(user, response.data.user);
	          mstIdentity.currentUser = user;
	          dfd.resolve(true);
	        } else {
	          dfd.resolve(false);
	        }
	      });
	      return dfd.promise;
       },
        logoutUser: function() {
	      var dfd = $q.defer();
	      $http.post('/logout', {logout:true}).then(function() {
	        mstIdentity.currentUser = undefined;
	        dfd.resolve();
	      });
	      return dfd.promise;
	    },
	    
	   authorizeAuthenticatedUserForRoute: function() {
	      if(mstIdentity.isAuthenticated()) {
	        return true;
	      } else {
	        return $q.reject('not authorized');
	      }
    	}
	}

});