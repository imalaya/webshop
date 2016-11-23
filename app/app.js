var webShop = angular.module('webShop', ['ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

webShop.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('public', {
        abstract: true,
        template: "<ui-view/>"
      })
    .state('public.site', {
            url: '/home',
            templateUrl: 'views/home-website.html',
            controller: 'CollapseController'
      })
    .state('public.site.papier', {
        url: '/papier',
        templateUrl:'views/papier.html'
      });

    //.state('public.site.contact', {
    //    url: '/contact',
    //    templateUrl:'views/contact.html'
    //});

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
      })

    // .state('private.admin.inventory.add', {
    //      templateUrl:'views/add-article.html',
    //      controller: 'InventoryController'
    //   })

      .state('private.admin.user', {
          url: '/mitarbeiter-verwalten',
          templateUrl:'views/manage-user.html',
          controller: 'UserController'
      });
}]);

