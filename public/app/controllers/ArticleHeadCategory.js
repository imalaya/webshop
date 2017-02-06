/**
 * Created by Ju on 01.02.2017.
 */
webShop.controller('ArticleHeadCategory', ['$scope', '$http', '$stateParams',function($scope, $http, $stateParams){

    $http.get('/api/article/headCategory/' + $stateParams.category).success(function(data){
        $scope.inventory = data.data;
    });

}]);
