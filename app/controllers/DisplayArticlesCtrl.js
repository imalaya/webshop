webShop.controller('DisplayArticlesCtrl', ['$scope', '$http', function($scope, $http){

  $http.get('data/inventory.json').success(function(data){
    $scope.inventory = data;
  });

  return{
    scope:{
      category:"="
    },
    require: "CollapseController",
    link: function (scope, element, attrs, CollapseController) {
        $scope.makeActive = function () {
            CollapseController.setActiveCategory(scope.category);
        },
        $scope.categoryActive = function () {
            return CollapseController.getActiveCategory() === scope.category.title;
        }
    }
  }

}]);
