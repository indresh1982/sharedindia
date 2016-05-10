userApp.controller('VerifyUserController', function ($scope, userFactory, statusClassFactory) {
  $scope.editDisable = false;
  $scope.header = 'Verify User';
  $scope.user = {email:'', vCode:''};
  $scope.loginInfo = '';
  $scope.infoClass = '';
  $scope.iconClass = '';

  $scope.verifyUser = function () {
    $scope.infoClass = statusClassFactory.getStatusClass('error');
    $scope.iconClass = statusClassFactory.getIconStatusClass('error');
    if(!$scope.verifyForm.email.$valid) {
      if($scope.verifyForm.email.$error.required) {
        $scope.loginInfo = 'Email is required.';
      }
      if($scope.verifyForm.email.$error.email) {
        $scope.loginInfo = 'Email format is not correct.';
      }
      return;
    }
    if(!$scope.verifyForm.vcode.$valid) {
      if($scope.verifyForm.vcode.$error.required) {
        $scope.loginInfo = 'Verification is required.';
      }
      return;
    }
    $scope.editDisable = true;
    
    userFactory.verify($scope.user.email, $scope.user.vCode, function (data) {
      $scope.editDisable = data.type=='success'?true:false;
      $scope.infoClass = statusClassFactory.getStatusClass(data.type);
      $scope.iconClass = statusClassFactory.getIconStatusClass(data.type);
      $scope.loginInfo = data.textMsg;
    });
  }
  $scope.resendUser = function () {
    $scope.infoClass = statusClassFactory.getStatusClass('error');
    $scope.iconClass = statusClassFactory.getIconStatusClass('error');
    if(!$scope.verifyForm.email.$valid) {
      if($scope.verifyForm.email.$error.required) {
        $scope.loginInfo = 'Email is required.';
      }
      if($scope.verifyForm.email.$error.email) {
        $scope.loginInfo = 'Email format is not correct.';
      }
      return;
    }
    userFactory.resend($scope.user.email, function (data) {
      $scope.infoClass = statusClassFactory.getStatusClass(data.type);
      $scope.iconClass = statusClassFactory.getIconStatusClass(data.type);
      $scope.loginInfo = data.textMsg;
    });
    $scope.infoClass = statusClassFactory.getStatusClass('');
    $scope.iconClass = statusClassFactory.getIconStatusClass('');
  }
});
