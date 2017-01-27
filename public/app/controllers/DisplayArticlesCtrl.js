webShop.controller('DisplayArticlesCtrl', ['$scope', '$http', function($scope, $http){

  $http.get('api/article').success(function(data){
    $scope.inventory = data.data;
  });

}]);


//$http.get('data/inventory.json').success(function(data){
//    $scope.inventory = data;
//});