webShop.controller('MemberController', ['$scope', '$http','$uibModal', '$log', function($scope, $http, $uibModal, $log){

    $http.get('data/staff.json').success(function(data){
        $scope.staff = data;
    });

}]);