var locationApp = angular.module('locationApp', ['ngRoute']);
locationApp.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
      controller: 'AddController',
      templateUrl:'js/views/add.html'
    })
    .otherwise({redirectTo:'/'})
});
/*.when('/search',{
 controller: 'SearchController',
 templateUrl:'js/views/search.html'
 })
 .when('/location',{
 controller: 'LocationController',
 templateUrl:'js/views/location.html'
 })
 .when('/delete',{
 controller: 'DeleteController',
 templateUrl:'js/views/delete.html'
 })
 .when('/modify',{
 controller: 'ModifyController',
 templateUrl:'js/views/modify.html'
 })*/

