userApp.controller('LogoutController', function ($scope, userFactory, statusClassFactory) {
  $scope.header = 'Logout';
  $scope.loginInfo = '';
  $scope.infoClass = '';
  $scope.iconClass = '';

  $scope.goToHome = function () {
    window.location = '/';
  };
  $scope.logout = function () {
    userFactory.logout(function (result) {
      $scope.infoClass = statusClassFactory.getStatusClass(result.type);
      $scope.iconClass = statusClassFactory.getIconStatusClass(result.type);
      $scope.loginInfo = result.textMsg;
      if(result.data && result.type == 'success') {
        SharedGlobal.logout();
        SharedGlobal.setNav();
      }
    });
  };
  $scope.logout();
});