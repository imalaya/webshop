webShop.controller('ArticleDetailsCtrl', ['$scope', '$http', '$stateParams',function($scope, $http, $stateParams){

  $http.get('data/inventory.json' + $stateParams.id).success(function(data){
    $scope.article = data;
  });

}]);
