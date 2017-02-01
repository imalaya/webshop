webShop.controller('CollapseController', ['$scope', '$http', function($scope, $http){
  $scope.isNavCollapsed = true;
  $http.get('api/article').success(function(data){
    $scope.inventory = data.data;
  });

}]);
