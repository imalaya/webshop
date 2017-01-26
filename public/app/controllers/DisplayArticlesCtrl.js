webShop.controller('DisplayArticlesCtrl', ['$scope', '$http', function($scope, $http){

  $http.get('data/inventory.json').success(function(data){
    $scope.inventory = data;
  });

}]);


//$http.get('data/inventory.json').success(function(data){
//    $scope.inventory = data;
//});