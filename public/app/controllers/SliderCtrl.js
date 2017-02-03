/**
 * Created by Lauren on 12.01.17.
 */
webShop.controller('SliderCtrl', ['$scope', '$http', function($scope, $http){

    $http.get('data/slides.json').success(function(data){
        $scope.slides = data;
    });

    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.noPauseSlide = true;
    $scope.active = 0;

}]);