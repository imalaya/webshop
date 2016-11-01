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

webShop.controller('InventarController', ['$scope', '$http', function($scope, $http){

  $scope.removeartikel = function(artikel) {
    var removedartikel = $scope.inventar.indexOf(artikel);
    $scope.inventar.splice(removedartikel, 1);
  };

  $scope.addartikel = function(){
    $scope.inventar.push({
      name: $scope.newartikel.name,
      kategorie: $scope.newartikel.kategorie,
      preis: parseInt($scope.newartikel.preis),
      available: true
    });

//reset placeholder
    $scope.newartikel.name="";
    $scope.newartikel.kategorie="";
    $scope.newartikel.preis="";

  };

//get test data
  $http.get('data/inventar.json').success(function(data){
    $scope.inventar = data;
  })

}]);
