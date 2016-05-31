userApp.controller('ResetController', function ($scope, userFactory, statusClassFactory) {
  $scope.editDisable = false;
  $scope.isLoading = false;
  $scope.header = 'Reset Password';
  $scope.user = {email:'', oldPassword:'', newPassword:'', cNPassword:''};
  $scope.loginInfo = '';
  $scope.infoClass = '';
  $scope.iconClass = '';

  $scope.reset = function () {
    $scope.infoClass = statusClassFactory.getStatusClass('error');
    $scope.iconClass = statusClassFactory.getIconStatusClass('error');
    if(!$scope.resetForm.email.$valid) {
      if($scope.resetForm.email.$error.required) {
        $scope.loginInfo = 'Email is required.';
      }
      if($scope.resetForm.email.$error.email) {
        $scope.loginInfo = 'Email format is not correct.';
      }
      return;
    }
    if(!$scope.resetForm.opassword.$valid) {
      if($scope.resetForm.opassword.$error.required) {
        $scope.loginInfo = 'Old Password is required.';
      }
      if($scope.resetForm.opassword.$error.minlength) {
        $scope.loginInfo = 'Old Password at least 4 characters.';
      }
      return;
    }
    if(!$scope.resetForm.npassword.$valid) {
      if($scope.resetForm.npassword.$error.required) {
        $scope.loginInfo = 'New Password is required.';
      }
      if($scope.resetForm.npassword.$error.minlength) {
        $scope.loginInfo = 'New Password at least 4 characters.';
      }
      return;
    }
    if($scope.user.newPassword == $scope.user.oldPassword) {
      $scope.loginInfo = 'New Password and Old Password are matched.';
      return;
    }
    if($scope.user.newPassword !== $scope.user.cNPassword) {
      $scope.loginInfo = 'New Password and confirm New Password are not matched.';
      return;
    }
    $scope.editDisable = true;
    $scope.isLoading = true;
    $scope.loginInfo = null;
    $scope.infoClass = statusClassFactory.getStatusClass('');
    $scope.iconClass = statusClassFactory.getIconStatusClass('');

    userFactory.reset($scope.user.email, $scope.user.oldPassword, $scope.user.newPassword, function (data) {
      $scope.editDisable = data.type=='success'?true:false;
      $scope.isLoading = false;
      $scope.infoClass = statusClassFactory.getStatusClass(data.type);
      $scope.iconClass = statusClassFactory.getIconStatusClass(data.type);
      $scope.loginInfo = data.textMsg;
    });
  }
});
