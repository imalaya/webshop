var webShop = angular.module('webShop', ['ui.router']);

webShop.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('public', {
        abstract: true,
        template: "<ui-view/>"
      })
    .state('public.site', {
        url: '/home',
        templateUrl:'views/home-website.html'
      })
    .state('public.site.papier', {
        url: '/papier',
        templateUrl:'views/papier.html'
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
        url: '/artikel-verwalten',
        templateUrl:'views/manage-articles.html',
        controller: 'InventoryController'
      });
}]);
