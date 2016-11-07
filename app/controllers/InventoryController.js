webShop.controller('InventoryController', ['$scope', '$http', function($scope, $http){

  $scope.removeArticle = function(article) {
    var removedArticle = $scope.inventory.indexOf(article);
    $scope.inventory.splice(removedArticle, 1);
  };

  $scope.addArticle = function(){
    $scope.inventory.push({
      name: $scope.newArticle.name,
      category: $scope.newArticle.category,
      price: parseInt($scope.newArticle.price),
      description: $scope.newArticle.description,
      quantity: $scope.newArticle.quantity,
      available: true,
      thumb: $scope.newArticle.thumb
    });

//reset placeholder
    $scope.newArticle.name="";
    $scope.newArticle.category="";
    $scope.newArticle.price="";
    $scope.newArticle.description="";
    $scope.newArticle.quantity="";
    $scope.newArticle.thumb="";
    $scope.addArticleForm.$setUntouched();

  };

//get test data
  $http.get('data/inventory.json').success(function(data){
    $scope.inventory = data;
  })

}]);
