//controls the app, binds in additional angular modules
var webShop = angular.module('webShop', ['ngRoute', 'ngAnimate']);

//fires up before the app starts to run
webShop.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  //$locationProvider.html5Mode(true);

  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html'
    })
    .when('/directory', {
      templateUrl: 'views/artikel-verwalten.html',
      controller: 'InventarController'
    }).otherwise({
      redirectTo: '/home'
    });

}]);
//
// webShop.run(function(){
//
// });
