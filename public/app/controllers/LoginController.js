webShop.controller('LoginController', ['$scope', '$rootScope', '$http', '$location', 'AuthenticationService', '$log', function($scope, $rootScope, $http, $location, AuthenticationService, $log){

    'use strict';

    angular.module('AuthenticationService');

                    // reset login status
                    AuthenticationService.ClearCredentials();

                    $scope.login = function () {
                        $scope.dataLoading = true;
                        AuthenticationService.Login($scope.username, $scope.password, function(response) {
                            if(response.success) {
                                AuthenticationService.SetCredentials($scope.username, $scope.password);
                                $location.path('/admin');
                            } else {
                                $scope.error = response.message;
                                $scope.dataLoading = false;
                            }
                        });
                    };
                }]);