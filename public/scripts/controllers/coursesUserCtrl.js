'use strict';

angular.module('myAdminApp').controller("CoursesCtrl", function ($ocLazyLoad, $scope, $state, $rootScope, adminServices, mentorServices, $stateParams) {
    $scope.degreelist;
    $scope.degreeporgramlist;
    $scope.degreeprogramarealist;
    $scope.registerFormData;
    $scope.studentdetails;
    $scope.loadingD;
    $scope.loadingP;
    $scope.loadingPA;
    $scope.loadingC;
    $scope.editPaper;
    $scope.editForm = {};

    $scope.editForm.mentornameEdit = undefined;

    $scope.getMentorsList = function () {
        mentorServices.getMentors()
                .then(function (response) {
                    $scope.mentorsList = response.data;
                    $scope.loading = false;
                }, function (error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                });
    }

    $scope.getDegreeList = function () {
        $scope.loadingD = $scope.loading = true;
        adminServices.getDegreeList()
                .then(function (response) {
                    $scope.degreelist = response.data;
                    $scope.loadingD = $scope.loading = false;
                }, function (error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                });
    }

    $scope.getProgramAreaList = function () {
        $scope.loadingD = $scope.loading = true;
        adminServices.getProgramAreaList()
                .then(function (response) {
                    $scope.programAreaList = response.data;
                    $scope.loadingD = $scope.loading = false;
                }, function (error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                });
    }

    $scope.getDegreeProgram = function () {
        $scope.loadingPA = $scope.loading = true;
        adminServices.getDegreePrograms($scope.registerFormData.desireddegree)
                .then(function (response) {
                    $scope.degreeporgramlist = response.data;
                    $scope.loadingPA = $scope.loading = false;
                }, function (error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                });
    }

    $scope.getDegreeProgramArea = function () {
        $scope.loadingP = $scope.loading = true;
        adminServices.getDegreeProgramAreas($scope.registerFormData.desiredprogramarea, $scope.registerFormData.desireddegree)
                .then(function (response) {
                    $scope.degreeporgramarealist = response.data;
                    $scope.loadingP = $scope.loading = false;
                }, function (error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                });
    }

    $scope.getProgramWithPaperCount = function () {
        $scope.loadingP = $scope.loading = true;
        adminServices.getProgramWithPaperCount($scope.registerFormData.desiredprogramarea, $scope.registerFormData.desireddegree)
                .then(function (response) {
                    $scope.degreeporgramAreas = response.data;
                    $scope.loadingP = $scope.loading = false;
                }, function (error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                });
    }

    $scope.getPapersWithMentors = function () {
        $scope.loadingPAP = $scope.loading = true;
        adminServices.getPapersWithMentors($scope.registerFormData.desiredprogram)
                .then(function (response) {
                    $scope.loadingPAP = $scope.loading = false;
                    $scope.papers = response.data;
                }, function (error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                });
    }

    $scope.editPaper = function (paperID, paperName, paperCode, paperCost, mentorID, mentorName) {
        $scope.editPaperStatusCheck = false;
        $scope.editForm.papernameEdit = paperName;
        $scope.editForm.ModalText = "Editing " + paperName + " paper";
        $scope.editForm.papercodeEdit = paperCode;
        $scope.editForm.papercostEdit = paperCost;
        $scope.editForm.paperidEdit = paperID;
        $scope.editForm.mentoridEdit = mentorID;
        $scope.editForm.mentornameEdit = mentorName;
    }

    $scope.savePaperEdit = function () {
        $scope.editPaperStatusCheck = true;
        $scope.editPaperStatusClass = "alert-info";
        $scope.editPaperStatus = "Saving changes... Please wait!";

        if ($scope.editForm.paperidEdit == "" || $scope.registerFormData.desiredprogram == "") {
            if ($scope.editForm.mentoridEdit == "" || $scope.editForm.papernameEdit == "" || $scope.editForm.papercodeEdit == "" || $scope.editForm.papercostEdit == "") {
                $scope.editPaperStatusClass = "alert-warning";
                $scope.editPaperStatus = "Some fields are empty. Fill all fields!";
            } else {
                if (isNaN($scope.editForm.papercostEdit)) {
                    $scope.editPaperStatusClass = "alert-warning";
                    $scope.editPaperStatus = "Paper cost can't contain alphabets!";
                } else {
                    console.log($scope.registerFormData.desiredprogram, $scope.editForm.papernameEdit, $scope.editForm.papercodeEdit, $scope.editForm.papercostEdit, $scope.editForm.mentoridEdit)
                    adminServices.savePaperNew($scope.registerFormData.desiredprogram, $scope.editForm.papernameEdit, $scope.editForm.papercodeEdit, $scope.editForm.papercostEdit, $scope.editForm.mentoridEdit)
                            .then(function (response) {
                                $scope.editPaperStatusClass = "alert-success";
                                $scope.editPaperStatus = "Changes saved successfully!";
                            }, function (error) {
                                $scope.editPaperStatusClass = "alert-danger";
                                $scope.editPaperStatus = "Error occurred! Please try again later.";
                                console.log(error.message);
                            });
                }
            }

        } else {
            //Edit Paper
            adminServices.savePaperEdit($scope.editForm.paperidEdit, $scope.editForm.papernameEdit, $scope.editForm.papercodeEdit, $scope.editForm.papercostEdit, $scope.editForm.mentoridEdit)
                    .then(function (response) {
                        $scope.editPaperStatusClass = "alert-success";
                        $scope.editPaperStatus = "Changes saved successfully!";
                        $scope.papers = response.data;
                    }, function (error) {
                        $scope.editPaperStatusClass = "alert-danger";
                        $scope.editPaperStatus = "Error occurred! Please try again later.";
                        console.log(error.message);
                    });
        }
    }

    $scope.deletePaper = function (paperID, paperName) {
        if (confirm("Do you really want to delete " + paperName + " paper?")) {
            $scope.PaperStatusCheck = true;
            $scope.PaperStatusClass = "alert-info";
            $scope.PaperStatus = "Deleting paper... Please wait!";
            adminServices.deletePaper(paperID)
                    .then(function (response) {
                        $scope.PaperStatusClass = "alert-success";
                        $scope.PaperStatus = paperName + " deleted successfully!";
                        $("#paper" + paperID).fadeOut();
                    }, function (error) {
                        $scope.PaperStatusClass = "alert-danger";
                        $scope.PaperStatus = "Error occurred! Please try again later.";
                        console.log(error.message);
                    });
        }
    }

    $scope.addPaper = function () {
        console.log($scope.registerFormData.desireddegree, $scope.registerFormData.desiredprogramarea, $scope.registerFormData.desiredprogram);
        $scope.editPaperStatusCheck = false;
        $scope.editForm.papernameEdit = "";
        $scope.editForm.ModalText = "Adding a new paper";
        $scope.editForm.papercodeEdit = "";
        $scope.editForm.papercostEdit = "";
        $scope.editForm.paperidEdit = "";
        $scope.editForm.mentoridEdit = "";
        $scope.editForm.mentornameEdit = "";
    }

    $scope.fetchMentorID = function () {
        $scope.editForm.mentoridEdit = $scope.editForm.mentornameEdit.mentor_id;
    }

    $scope.getMentorsList();

});