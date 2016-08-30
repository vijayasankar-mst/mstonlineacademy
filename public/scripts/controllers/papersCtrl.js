'use strict';

/**
 * @ngdoc overview
 * @name mstApp
 * @description
 * # mstAp
 */
 angular.module('myAdminApp').controller('papersCtrl', ['$scope','paperServices','$state','$rootScope','adminServices','$filter', function($scope,paperServices,$state,$rootScope,adminServices,$filter) {   
    $scope.papers;
    $scope.loading = true;
    $scope.selectedItems = 0;
    $scope.totalAmount = 0;

    $scope.today = $filter('date')(new Date(), 'dd/MM/yy');

    $scope.getPaperList = function(){
      var program_id = $rootScope.identity.currentUser.studentinfo.program_id;
      paperServices.getPaperLists(program_id)
      .then(function (response) {
       $scope.papers = response.data;
       $scope.loading = false;
   }, function (error) {

   });
  };

  $scope.getStudentInfo = function(){
    adminServices.getStudentInfo()
    .then(function (response) {
        $rootScope.identity.currentUser.studentinfo = response.data[0];
        $scope.getPaperList();
    }, function (error) {
        $scope.status = 'Unable to load customer data: ' + error.message;
    });
};


$scope.checkedCount = function(){
  return $scope.papers.filter(function(item){
    $scope.totalAmount += item.paper_cost;
    return item.selected;
}).length;
}

$scope.checkPapers = function(){
    $scope.errMsg  = ($scope.errMsg) ? false : false;
    $scope.ListOfSelected = $scope.papers.filter(function (item) {  return (item.selected == true);   });
    $scope.tAmount =  $scope.ListOfSelected.reduce(function(prevVal, elem) { return prevVal + elem.paper_cost; }, 0);
    console.log("Total Amount = ",  $scope.tAmount);
};

$scope.proceedToNext = function() {

    if( $scope.checkedCount() < 3) {
        $scope.errMsg = true;
        $scope.errMsgInfo = 'You must select minimum 3 papers';    
        return false;
    }else{
        $scope.errMsg = false;
        $state.go("dashboard.papers.payment");
    }

};

$scope.backToPapersView = function(){
    $state.go("dashboard.papers.list");
};

$scope.submitPayment = function(){
    paperServices.saveStudentOpportunity($scope.ListOfSelected)
    .then(function (response) {
      $scope.successStuPay = true;
      $scope.successStuPayType = true;
      $scope.status = "Success! Payement done successfully!";
        // $rootScope.identity.currentUser.studentinfo = response.data[0];
        // $scope.getPaperList();
    }, function (error) {
        $scope.successStuPayType = false;
        $scope.successStuPay = true;
        $scope.status = "Sorry! Payment failed for some reason, please try again!";
        setTimeout(function() {
            $state.go("dashboard.papers.list");
        }, 3000);
    });
};

$scope.getStudentInfo();

}]);