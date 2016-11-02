webShop.controller('InventarController', ['$scope', '$http', function($scope, $http){

  $scope.removeartikel = function(artikel) {
    var removedartikel = $scope.inventar.indexOf(artikel);
    $scope.inventar.splice(removedartikel, 1);
  };

  $scope.addartikel = function(){
    $scope.inventar.push({
      name: $scope.newartikel.name,
      kategorie: $scope.newartikel.kategorie,
      preis: parseInt($scope.newartikel.preis),
      beschreibung: $scope.newartikel.beschreibung,
      menge: $scope.newartikel.menge,
      available: true,
      thumb: $scope.newartikel.thumb
    });

//reset placeholder
    $scope.newartikel.name="";
    $scope.newartikel.kategorie="";
    $scope.newartikel.preis="";
    $scope.newartikel.beschreibung="";
    $scope.newartikel.menge="";
    $scope.newartikel.thumb="";
    $scope.addArticle.$setUntouched();

  };

//get test data
  $http.get('data/inventar.json').success(function(data){
    $scope.inventar = data;
  })

}]);
