webShop.controller('CollapseController', ['$scope', '$http', function($scope, $http, Category){
  $scope.isNavCollapsed = true;

  $http.get('data/categories.json').success(function(data){
      $scope.categories = data;
  });

  return {
      link: function (scope, element, attrs) {
          scope.categories = Category.query();
      },
      controller: function () {
          this.getActiveCategory = function () {
              return $scope.activeCategory;
          },
              this.setActiveCategory = function (category) {
                  $scope.activeCategory = category;
              }
          return this;
      }
  };
}]);
