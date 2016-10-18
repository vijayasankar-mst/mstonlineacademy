'use strict';

angular.module('myApp').controller('MentorsCtrl1', ['$scope', 'mentorServices1', '$state', function ($scope, mentorServices1, $state) {
        $scope.mentors1;
        $scope.getMentorsList1 = function () {
            mentorServices1.getMentors()
                    .then(function (response) {
                        $scope.mentors1 = response.data;
                    }, function (error) {
                        $scope.status = 'Unable to load customer data: ' + error.message;
                    });
        }
        $scope.getMentorsList1();
    }
]);