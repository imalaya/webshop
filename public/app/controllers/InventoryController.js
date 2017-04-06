webShop.controller('InventoryController', ['$scope', '$http', '$stateParams', '$uibModal', '$log', 'Upload', '$timeout', '$state', function($scope, $http, $stateParams, $uibModal, $log, Upload, $timeout, $state){

  $scope.removeArticle = function(article) {
    var deleteID = article.id;
    $http.delete('/api/article/' + deleteID).success(function (data) {
      $scope.inventory = data.data;
    });
      $state.reload();
  };

//Artikel hinzufuegen Modal
$scope.createArticle = function (size) {
  var modalInstance = $uibModal.open({
    animation: true,
    ariaLabelledBy: 'modal-title',
    ariaDescribedBy: 'modal-body',
    templateUrl: 'views/admin/new-article.html',
    controller: function($scope, $uibModalInstance){
      // $scope.addArticle = function(thumb) {
      // thumb.upload = Upload.upload({
      //   // url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
      //   url: '/api/article',
      //   data: {name: $scope.newArticle.name, category: $scope.newArticle.category, price: $scope.newArticle.price, description: $scope.newArticle.description, quantity: $scope.newArticle.quantity, file: thumb},
      // });
      //
      // thumb.upload.then(function (response) {
      //   $timeout(function () {
      //     thumb.result = response.data;
      //     console.log(thumb.result);
      //   });
      // }, function (response) {
      //   if (response.status > 0)
      //     $scope.errorMsg = response.status + ': ' + response.data;
      // }, function (evt) {
      //   // Math.min is to fix IE which reports 200% sometimes
      //   thumb.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      // });
      // $uibModalInstance.close();
      // }

      var categories = ['Papeterie', 'Stifte', 'Zubehör', 'Technik', 'Geschenke'];
      $scope.categories = categories;

      var options = [['Karten', 'Notizblöcke', 'Kalender', 'Poster'],
      ['Kugelschreiber', 'Füllfederhalter', 'Bleistifte', 'Filzstifte'],
      ['Etuis', 'Tape', 'Büroklammern', 'Sonstiges'], ['Schreibmaschinen', 'Technik-Zubehör'],
      ['Geschenke-Sets', 'Grußkarten', 'Fotohalterungen', 'Geschenkpapier']];
      $scope.subcategories = [];

      $scope.getSubCategories = function() {
        var key = $scope.categories.indexOf($scope.newArticle.category);
        var conditionalOptions = options[key];
        $scope.subcategories = conditionalOptions;
      };

      $scope.create = function () {
      $http.post('/api/article/', $scope.newArticle).success(function (data) {
        $scope.inventory = data.data;
        $scope.showAlert = true;
      });
      };

      $scope.ok = function () {
        $timeout(function() {
            $uibModalInstance.close();
            $state.reload();
        }, 3000);
      };

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
      // var copy = angular.copy($scope.article);

      $scope.article = angular.copy(article);

      $scope.update = function () {
      var editID = $scope.article.id;
      $http.put('/api/article/' + editID, $scope.article).success(function (data) {
        $scope.inventory = data.data;
      });
      };

      $scope.ok = function () {
        $uibModalInstance.close($scope.article);
        $state.reload();
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
  // $http.get('data/inventory.json').success(function(data){
  //    $scope.inventory = data;
  $http.get('/api/article').success(function(data){
    $scope.inventory = data.data;
  });

}]);
