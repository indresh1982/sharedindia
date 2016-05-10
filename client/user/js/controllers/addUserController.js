userApp.controller('AddUserController', function ($scope, userFactory, statusClassFactory) {
  $scope.editDisable = false;
  $scope.header = 'Add User';
  $scope.user = {email:'', password:'', cPassword:''};
  $scope.loginInfo = '';
  $scope.infoClass = '';
  $scope.iconClass = '';

  $scope.addUser = function () {
    $scope.infoClass = statusClassFactory.getStatusClass('error');
    $scope.iconClass = statusClassFactory.getIconStatusClass('error');
    if(!$scope.addForm.name.$valid) {
      if($scope.addForm.name.$error.required) {
        $scope.loginInfo = 'Name is required.';
      }
      return;
    }
    if(!$scope.addForm.email.$valid) {
      if($scope.addForm.email.$error.required) {
        $scope.loginInfo = 'Email is required.';
      }
      if($scope.addForm.email.$error.email) {
        $scope.loginInfo = 'Email format is not correct.';
      }
      return;
    }
    if(!$scope.addForm.password.$valid) {
      if($scope.addForm.password.$error.required) {
        $scope.loginInfo = 'Password is required.';
      }
      if($scope.addForm.password.$error.minlength) {
        $scope.loginInfo = 'Password at least 4 characters.';
      }
      return;
    }
    if($scope.user.password !== $scope.user.cPassword) {
      $scope.loginInfo = 'Password and confirm Password are not matched.';
      return;
    }
    $scope.editDisable = true;

    userFactory.add($scope.user.name, $scope.user.email, $scope.user.password, function (data) {
      $scope.editDisable = data.type=='success'?true:false;
      $scope.infoClass = statusClassFactory.getStatusClass(data.type);
      $scope.iconClass = statusClassFactory.getIconStatusClass(data.type);
      $scope.loginInfo = data.textMsg;
    });

    $scope.infoClass = statusClassFactory.getStatusClass('');
    $scope.iconClass = statusClassFactory.getIconStatusClass('');
  }
});
