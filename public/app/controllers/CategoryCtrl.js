/**
 * Created by Lauren on 05.01.17.
 */
webShop.controller('CategoryCtrl', ['$scope', '$http', function ($scope, $http) {

    $http.get('data/inventory.json').success(function (data) {
        $scope.inventory = data;
    });

    $scope.categoryFilter = {
        category:undefined
    };

}]);