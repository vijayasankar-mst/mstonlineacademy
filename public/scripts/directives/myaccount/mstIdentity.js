angular.module('myAdminApp').factory('mstIdentity', function($window, mstUser) {
  var currentUser;
  if(!!$window.bootstrappedUserObject) {
    currentUser = new mstUser();
    angular.extend(currentUser, $window.bootstrappedUserObject);
  }
  return {
    currentUser: currentUser,
    isAuthenticated: function() {
      return !!this.currentUser;
    },
    isAuthorized: function(role) {
      return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
    }
  }
})