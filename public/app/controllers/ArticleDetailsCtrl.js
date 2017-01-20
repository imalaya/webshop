webShop.controller('ArticleDetailsCtrl', ['$scope', '$http', '$stateParams',function($scope, $http, $stateParams){

  $http.get('api/article/' + $stateParams.id).success(function(data){
    $scope.article = data.data;
  });

}]);
