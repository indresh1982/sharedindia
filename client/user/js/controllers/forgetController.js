userApp.controller('ForgetController', function ($scope, userFactory, statusClassFactory) {
  $scope.header = 'Forget Password';
  $scope.user = {email:''};
  $scope.loginInfo = '';
  $scope.infoClass = '';
  $scope.iconClass = '';

  $scope.forgetUser = function () {
    $scope.infoClass = statusClassFactory.getStatusClass('error');
    $scope.iconClass = statusClassFactory.getIconStatusClass('error');
    if(!$scope.forgetForm.email.$valid) {
      if($scope.forgetForm.email.$error.required) {
        $scope.loginInfo = 'Email is required.';
      }
      if($scope.forgetForm.email.$error.email) {
        $scope.loginInfo = 'Email format is not correct.';
      }
      return;
    }
    userFactory.forget($scope.user.email, function (data) {
      $scope.infoClass = statusClassFactory.getStatusClass(data.type);
      $scope.iconClass = statusClassFactory.getIconStatusClass(data.type);
      $scope.loginInfo = data.textMsg;
    });
    $scope.infoClass = statusClassFactory.getStatusClass('');
    $scope.iconClass = statusClassFactory.getIconStatusClass('');
  }
});
