var webShop = angular.module('webShop', ['ngRoute', 'ngAnimate', 'ui.router']);

webShop.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('public', {
        abstract: true,
        template: "<ui-view/>"
      })
    .state('public.site', {
        url: '/',
        templateUrl:'views/home-website.html'
    });

  $stateProvider
    .state('private', {
      abstract: true,
      template: "<ui-view/>"
    })
    .state('private.admin', {
        url: '/admin',
        templateUrl:'views/home-admin.html'
      })
    .state('private.admin.inventory', {
        url: '/manage-inventory',
        templateUrl:'views/manage-inventory.html',
        controller: 'InventoryController'
      });
}]);
