webShop.controller('InventoryController', ['$scope', '$http', '$uibModal', '$log', function($scope, $http, $uibModal, $log){

  $scope.removeArticle = function(article) {
    var removedArticle = $scope.inventory.indexOf(article);
    $scope.inventory.splice(removedArticle, 1);
  };

//Artikel hinzufuegen Modal
$scope.createArticle = function (size) {

  var modalInstance = $uibModal.open({
    animation: true,
    ariaLabelledBy: 'modal-title',
    ariaDescribedBy: 'modal-body',
    templateUrl: 'views/adminViews/new-article.html',
    controller: function($scope, $uibModalInstance){
      $scope.ok = function () {
        $uibModalInstance.close();
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    },
    size: size,
  });
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
  };

// Artikel bearbeiten Modal
$scope.editArticle = function (size, selectedArticle) {

  var modalInstance = $uibModal.open({
    animation: true,
    ariaLabelledBy: 'modal-title',
    ariaDescribedBy: 'modal-body',
    templateUrl: 'views/adminViews/edit-article.html',
    controller: function($scope, $uibModalInstance, article){
      $scope.article = article;

      $scope.ok = function () {
        $uibModalInstance.close($scope.article);
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    },
    size: size,
    resolve: {
      article: function () {
        return selectedArticle;
      }
    }
  });
};

//get test data
  $http.get('data/inventory.json').success(function(data){
    $scope.inventory = data;
  });

}]);
