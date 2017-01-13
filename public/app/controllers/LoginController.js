webShop.controller('LoginController', ['$scope', '$http','$uibModal', '$log', function($scope, $http, $uibModal, $log){

    $scope.loginPage = function() {
        return function ( scope, element, attrs ) {
            var path;

            attrs.$observe( 'loginPage', function (val) {
                path = val;
            });

            element.bind( 'click', function () {
                scope.$apply( function () {
                    $location.path( path );
                });
            });
        };
    };

}]);