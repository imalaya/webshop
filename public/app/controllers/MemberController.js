webShop.controller('MemberController', ['$scope', '$http','$uibModal', '$log', function($scope, $http, $uibModal, $log){

  $scope.createMember = function (size) {

    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/admin/new-member.html',
      controller: function($scope, $uibModalInstance){

        $scope.sendEmail = function() {

            var data = ({
              lastname: $scope.newMember.lastname,
              firstname: $scope.newMember.firstname,
              email: $scope.newMember.email
            });

            $http.post('/member-form', data).
            success(function(data, status, headers, config) {
              //asynchronous callback
            }).
            error(function(data, status, headers, config) {
              //asynchronous call in case of error
            })
        };

        $scope.ok = function () {
          $uibModalInstance.close();
          $log.info('ok');
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      },
      size: size,
    });
  };

    $http.get('data/staff.json').success(function(data){
        $scope.staff = data;
    });

 }]);
