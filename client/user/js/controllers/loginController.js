userApp.controller('LoginController', function ($scope, $location, userFactory, statusClassFactory) {
  $scope.header = 'Login';
  $scope.loginInfo = '';
  $scope.infoClass = '';
  $scope.iconClass = '';

  $scope.user = {id:'', password:''};
  
  $scope.checkLogin = function () {
    $scope.infoClass = statusClassFactory.getStatusClass('error');
    $scope.iconClass = statusClassFactory.getIconStatusClass('error');

    if(!$scope.loginForm.email.$valid) {
      if($scope.loginForm.email.$error.required) {
        $scope.loginInfo = 'Email is required.';
      }
      if($scope.loginForm.email.$error.email) {
        $scope.loginInfo = 'Email format is not correct.';
      }
      return;
    }
    if(!$scope.loginForm.password.$valid) {
      if($scope.loginForm.password.$error.required) {
        $scope.loginInfo = 'Password is required.';
      }
      if($scope.loginForm.password.$error.minlength) {
        $scope.loginInfo = 'Password at least 4 characters.';
      }
      return;
    }
    userFactory.login($scope.user.id, $scope.user.password, function (result) {
      $scope.infoClass = statusClassFactory.getStatusClass(result.type);
      $scope.iconClass = statusClassFactory.getStatusClass(result.type);
      $scope.loginInfo = result.textMsg;
      
      if(result.data && result.data.status == 'success') {
        SharedGlobal.setLogin(result.data.data);
        window.location = '/';
      }
    });
    $scope.infoClass = statusClassFactory.getStatusClass('');
    $scope.iconClass = statusClassFactory.getIconStatusClass('');
  }
});