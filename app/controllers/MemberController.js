webShop.controller('MemberController', ['$scope', '$http','$uibModal', '$log', function($scope, $http, $uibModal, $log){

  $scope.createMember = function (size) {

    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/adminViews/new-member.html',
      controller: function($scope, $uibModalInstance){
        $scope.ok = function () {
          $uibModalInstance.close();
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      },
      size: size,
    });
  };

    $scope.addMember = function(){
      $scope.staff.push({
        lastname: $scope.newMember.lastname,
        firstname: $scope.newMember.firstname
      });
    };


    $http.get('data/staff.json').success(function(data){
        $scope.staff = data;
    });

    // var interestedPersonHandler = require('../core/userhandling/interestedPersonHandler');
    // interestedPersonHandler.createInterestedPerson("pieps.pups@gutemine.de");

}]);
