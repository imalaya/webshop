/**
 * Created by Ju on 01.02.2017.
 */
webShop.controller('ArticleCategory', ['$scope', '$http', '$stateParams',function($scope, $http, $stateParams){
    console.log("category1");


    $http.get('/api/article/category/' + $stateParams.category).success(function(data){
        $scope.inventory = data.data;
        console.log("category");

    });

}]);
