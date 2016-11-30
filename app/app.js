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
    })

    //anchor tags footer
    .state('public.site.contact', {
        url: '/contact',
        templateUrl:'views/footerLinks/contact.html'
    })
    .state('public.site.privacy', {
        url: '/privacy',
        templateUrl:'views/footerLinks/privacy.html'
    })
    .state('public.site.sitenotice', {
       url: '/sitenotice',
       templateUrl:'views/footerLinks/siteNotice.html'
    })
    .state('public.site.about', {
          url: '/about',
          templateUrl:'views/footerLinks/about.html'
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
      })

      .state('private.admin.member', {
          url: '/mitarbeiter-verwalten',
          templateUrl:'views/manage-member.html',
          controller: 'MemberController'
      });
}]);
