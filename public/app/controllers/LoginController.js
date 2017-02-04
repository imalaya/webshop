'use strict';

webShop.controller('LoginController', ['$scope', '$http', '$cookies', '$location',
    function($scope, $http, $cookies, $location){
        //debugger;

        $scope.clearCredentials = function() {
            //debugger;
            $cookies.remove('isLoggedIn', false);
        };


        $scope.login = function () {
                //debugger;
                var username = $scope.username;
                var password = $scope.password;

            console.log("--------------------------------------------------------" + username);
            console.log("--------------------------------------------------------" + password);


                $http.post('/api/userLogin', {username :username , password : password})
               .success(function (response) {
                  //callback(response);
                        console.log("Jippi geschafft.");
                });



                // call ans backend
                var isValidCredential = username === 'Paule' && password === 'admin';
                if (isValidCredential) {
                    // session cookie speichern
                    $cookies.put('isLoggedIn', 'true');
                    console.log('isLoggedIn');
                    $location.path('/admin');

                    //debugger;
                } else if(!isValidCredential) {
                    //debugger;
                    //isValidCredential.message = 'Username oder Passwort ist falsch.'
                    console.log('Username oder Passwort ist falsch');
                    //isValidCredential.message = 'Username oder Passwort ist falsch';
                }
                //callback(isValidCredential);
        };

        //Cookies removal setzen

        $scope.logout = function() {
            //debugger;
            $location.path('/login');
            $cookies.remove('isLoggedIn', 'false');
        };
    }]);