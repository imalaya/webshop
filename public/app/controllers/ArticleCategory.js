/**
 * Created by Ju on 01.02.2017.
 */
webShop.controller('ArticleCategory', ['$scope', '$http', '$stateParams',function($scope, $http, $stateParams){
   
    $http.get('/api/article/category/' + $stateParams.category).success(function(data){
        $scope.inventory = data.data;
    });

}]);
