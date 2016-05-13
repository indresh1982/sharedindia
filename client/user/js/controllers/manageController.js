userApp.controller('ManageController', function ($scope, $location, userFactory, statusClassFactory) {
  SharedGlobal.checkAdminRight('/user/#/manage/', 7);
  $scope.header = 'Manage User';
  $scope.loginInfo = '';
  $scope.infoClass = '';
  $scope.iconClass = '';
  var userType = SharedGlobal.getLogin().type;
  var rightOptions = [{id:0}];
  for(var i=1; i<=userType; i++){
    rightOptions.push({id:i});
  }
  $scope.user = {emain:'', password:'', searchEmail:'', right:null, rightOptions:rightOptions};
  $scope.manageUser = function () {
    $scope.infoClass = statusClassFactory.getStatusClass('error');
    $scope.iconClass = statusClassFactory.getIconStatusClass('error');

    if(!$scope.manageForm.yourEmail.$valid) {
      if($scope.manageForm.yourEmail.$error.required) {
        $scope.loginInfo = 'Your Email is required.';
      }
      if($scope.manageForm.yourEmail.$error.email) {
        $scope.loginInfo = 'Your Email format is not correct.';
      }
      return;
    }
    if(!$scope.manageForm.password.$valid) {
      if($scope.manageForm.password.$error.required) {
        $scope.loginInfo = 'Password is required.';
      }
      if($scope.manageForm.password.$error.minlength) {
        $scope.loginInfo = 'Password at least 4 characters.';
      }
      return;
    }
    if(!$scope.manageForm.searchEmail.$valid) {
      if($scope.manageForm.searchEmail.$error.required) {
        $scope.loginInfo = 'Search Email is required.';
      }
      if($scope.manageForm.searchEmail.$error.email) {
        $scope.loginInfo = 'Search Email format is not correct.';
      }
      return;
    }
    if(!$scope.manageForm.searchUserRight.$valid) {
      if($scope.manageForm.searchUserRight.$error.required) {
        $scope.loginInfo = 'Please select user right!!!';
      }
      return;
    }
    $scope.infoClass = statusClassFactory.getStatusClass('');
    $scope.iconClass = statusClassFactory.getIconStatusClass('');

    userFactory.mange($scope.user.email, $scope.user.password, $scope.user.searchEmail, $scope.user.right, function (result) {
      $scope.infoClass = statusClassFactory.getStatusClass(result.type);
      $scope.iconClass = statusClassFactory.getIconStatusClass(result.type);
      $scope.loginInfo = result.textMsg
    });
  }
});