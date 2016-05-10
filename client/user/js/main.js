var userApp = angular.module('userApp', ['ngRoute']);
userApp.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
      controller: 'LoginController',
      templateUrl:'js/views/login.html'
    })
    .when('/add',{
      controller: 'AddUserController',
      templateUrl:'js/views/addUser.html'
    })
    .when('/verify',{
      controller: 'VerifyUserController',
      templateUrl:'js/views/verifyUser.html'
    })
    .when('/forget',{
      controller: 'ForgetController',
      templateUrl:'js/views/forget.html'
    })
    .when('/reset',{
      controller: 'ResetController',
      templateUrl:'js/views/reset.html'
    })
    .when('/logout',{
      controller: 'LogoutController',
      templateUrl:'js/views/logout.html'
    })
    .otherwise({redirectTo:'/'})
});

