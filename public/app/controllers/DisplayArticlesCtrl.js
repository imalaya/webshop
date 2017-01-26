webShop.controller('DisplayArticlesCtrl', ['$scope', 'DataService', function($scope, DataService){

    $http.get('data/inventory.json').success(function(data){
        $scope.inventory = data;
    });


}]);
