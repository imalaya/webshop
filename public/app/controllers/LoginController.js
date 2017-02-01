'use strict';

webShop.controller('LoginController', ['$scope', '$cookies',
    function($scope, $cookies){

                    $scope.login = function () {
//                       debugger;
                       var username = $scope.username;
                       var password = $scope.password;

                       // call ans backend
                       var isValidCredential = dummyLogin(username, password);
                       if (isValidCredential) {
                           // session cookie speichern
                           $cookies.put('isLoggedIn', true);

                           //debugger;
                       } else {
                           // fehlermeldung anzeigen
                       }
                    };



                    //Cookies removal setzen
                }]);

function dummyLogin(username, password) {
    if(username === "aaa")
        return false;
    return true;
}