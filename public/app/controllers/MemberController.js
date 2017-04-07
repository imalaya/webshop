webShop.controller('MemberController', ['$scope', '$http','$uibModal', '$log', function($scope, $http, $uibModal, $log){

  $scope.createMember = function (size) {

    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/admin/new-member.html',
      controller: function($scope, $uibModalInstance){

        $scope.createAddress = function(){
          if($scope.newMember.firstname && $scope.newMember.lastname)
          {
            $scope.newMember.email = $scope.newMember.firstname + '.' +
            $scope.newMember.lastname + '@gutemine.de';
          }
        }

        $scope.sendMail = function() {

            var data = ({
              firstName: $scope.newMember.firstname,
              lastName: $scope.newMember.lastname,
              email: $scope.newMember.email,
              testMail: $scope.newMember.testMail
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
