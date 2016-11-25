webShop.controller('MemberController', ['$scope', '$http','$uibModal', '$log', function($scope, $http, $uibModal, $log){

    $http.get('data/staff.json').success(function(data){
        $scope.staff = data;
    });

    // var interestedPersonHandler = require('../core/userhandling/interestedPersonHandler');
    // interestedPersonHandler.createInterestedPerson("pieps.pups@gutemine.de"); 

}]);
