webShop.controller('InventoryController', ['$scope', '$http', '$uibModal', '$log', 'Upload', '$timeout', function($scope, $http, $uibModal, $log, Upload, $timeout){

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
    templateUrl: 'views/admin/new-article.html',
    controller: function($scope, $uibModalInstance){
      $scope.addArticle = function(thumb) {
      thumb.upload = Upload.upload({
        url: '/api/article',
        // url: '/api/article',
        data: {name: $scope.newArticle.name, category: $scope.newArticle.category, price: parseInt($scope.newArticle.price), description: $scope.newArticle.description, quantity: $scope.newArticle.quantity, file: thumb},
      });

      thumb.upload.then(function (response) {
        $timeout(function () {
          thumb.result = response.data;
          console.log(thumb.result);
        });
      }, function (response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        // Math.min is to fix IE which reports 200% sometimes
        thumb.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
      $uibModalInstance.close();
      }

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    },
    size: size,
  });
};

// Artikel bearbeiten Modal
$scope.editArticle = function (size, selectedArticle) {

  var modalInstance = $uibModal.open({
    animation: true,
    ariaLabelledBy: 'modal-title',
    ariaDescribedBy: 'modal-body',
    templateUrl: 'views/admin/edit-article.html',
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
  // Wenn man noch keine Datenbank hat noch die Verweisung zur json-Datei anpassen.
  $http.get('data/inventory.json').success(function(data){
     $scope.inventory = data;
  // $http.get('/api/article').success(function(data){
  //   $scope.inventory = data.data;
  });

}]);
