angular.module('myAdminApp')
.directive('loading', function () {
      return {
        restrict: 'E',
        replace:true,
        template: '<div class="loading" style="font-weight:bold;"><img src="images/ajax-loader.gif" width="20" height="20" />LOADING...</div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      }
  })