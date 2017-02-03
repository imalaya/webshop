webShop.controller('ContactController', ['$scope', '$http', function($scope, $http){

  $scope.sendMail = function() {

      var data = ({
        contactName: $scope.contactName,
        contactEmail: $scope.contactEmail,
        contactMsg: $scope.contactMsg
      });

      $http.post('/contact-form', data).
      success(function(data, status, headers, config) {
        //asynchronous callback
      }).
      error(function(data, status, headers, config) {
        //asynchronous call in case of error
      })

      //reset placeholder
    $scope.contactName = "";
    $scope.contactEmail = "";
    $scope.contactMsg = "";
    $scope.contactForm.$setUntouched();


  };

}]);
