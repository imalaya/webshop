//controls the app, binds in additional angular modules
var webShop = angular.module('webShop', ['ngRoute', 'ngAnimate']);

//fires up before the app starts to run
webShop.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  //$locationProvider.html5Mode(true);

  $routeProvider
    .when('/home', {
      templateUrl: 'views/home-website.html'
    })
    .when('/admin', {
      templateUrl: 'views/home-admin.html'
    })
    .when('/manage-inventory', {
      templateUrl: 'views/manage-inventory.html',
      controller: 'InventoryController'
    })
   .otherwise({
    redirectTo: '/home',
  });

}]);
//
// webShop.run(function(){
//
// });
