locationApp.controller('AddController', function ($scope, locationFactory, statusClassFactory) {
  $scope.editDisable = false;
  $scope.isLoading = false;
  $scope.header = 'Add Location';
  $scope.loginInfo = '';
  $scope.infoClass = '';
  $scope.iconClass = '';
  $scope.regEx = {geo:'^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}'};
  $scope.location = {type:'', Name:'', pCity:'', pDist:'', pState:'', latitude:'', longitude:''};
  $scope.typeList = locationFactory.getCategory();

  $scope.add = function () {
    $scope.infoClass = statusClassFactory.getStatusClass('error');
    $scope.iconClass = statusClassFactory.getIconStatusClass('error');
    if(!$scope.addForm.name.$valid) {
      if($scope.addForm.name.$error.required) {
        $scope.loginInfo = 'Name is required.';
      }
      return;
    }
    if(!$scope.addForm.type.$valid) {
      if($scope.addForm.type.$error.required) {
        $scope.loginInfo = 'Type is required.';
      }
      return;
    }
    if(!$scope.addForm.pState.$valid) {
      if($scope.addForm.pState.$error.required) {
        $scope.loginInfo = 'State is required.';
      }
      return;
    }
    if(!$scope.addForm.pDist.$valid) {
      if($scope.addForm.pDist.$error.required) {
        $scope.loginInfo = 'District is required.';
      }
      return;
    }
    if(!$scope.addForm.pCity.$valid) {
      if($scope.addForm.pCity.$error.required) {
        $scope.loginInfo = 'City is required.';
      }
      return;
    }
    if(!$scope.addForm.latitude.$valid) {
      if($scope.addForm.latitude.$error.required) {
        $scope.loginInfo = 'Latitude is required.';
      }
      if($scope.addForm.latitude.$error.pattern) {
        $scope.loginInfo = 'Latitude is not correct.';
      }
      return;
    }
    if(!$scope.addForm.longitude.$valid) {
      if($scope.addForm.longitude.$error.required) {
        $scope.loginInfo = 'Longitude is required.';
      }
      if($scope.addForm.longitude.$error.pattern) {
        $scope.loginInfo = 'Longitude is not correct.';
      }
      return;
    }
    $scope.editDisable = true;
    $scope.isLoading = true;
    $scope.loginInfo = null;
    $scope.infoClass = statusClassFactory.getStatusClass('');
    $scope.iconClass = statusClassFactory.getIconStatusClass('');

    locationFactory.add($scope.location, function (data) {
      $scope.editDisable = data.type=='success'?true:false;
      $scope.isLoading = false;
      $scope.infoClass = statusClassFactory.getStatusClass(data.type);
      $scope.iconClass = statusClassFactory.getIconStatusClass(data.type);
      $scope.loginInfo = data.textMsg;
    });
  }
});
