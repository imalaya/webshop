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
            templateUrl: 'views/customer/home-website.html',
            controller: 'CollapseController'
    })
    .state('public.site.articles', {
        url: '/alle-artikel',
        templateUrl:'views/customer/all-articles.html',
        controller: 'DisplayArticlesCtrl'
    })

    .state('public.site.details', {
        url: '/artikel/{id}',
        templateUrl:'views/customer/article-details.html',
        controller: 'ArticleDetailsCtrl'
    })

    //anchor tags footer
    .state('public.site.contact', {
        url: '/contact',
        templateUrl:'views/customer/footer/contact.html'
    })
    .state('public.site.privacy', {
        url: '/privacy',
        templateUrl:'views/customer/footer/privacy.html'
    })
    .state('public.site.sitenotice', {
       url: '/sitenotice',
       templateUrl:'views/customer/footer/siteNotice.html'
    })
    .state('public.site.about', {
          url: '/about',
          templateUrl:'views/customer/footer/about.html'
    });

  $stateProvider
    .state('private', {
      abstract: true,
      template: "<ui-view/>"
    })

    .state('private.admin', {
        url: '/admin',
        templateUrl:'views/admin/home-admin.html'
      })

    .state('private.admin.inventory', {
        url: '/artikel-verwalten',
        templateUrl:'views/admin/manage-articles.html',
        controller: 'InventoryController'
      })

      .state('private.admin.inventory.add', {
          templateUrl:'views/admin/new-article.html',
          controller: 'InventoryController',
          parent: 'private.admin.inventory'
        })

        .state('private.admin.inventory.edit', {
            templateUrl:'views/admin/edit-article.html',
            controller: 'InventoryController',
            parent: 'private.admin.inventory'
          })

      .state('private.admin.member', {
          url: '/mitarbeiter-verwalten',
          templateUrl:'views/admin/manage-members.html',
          controller: 'MemberController'
      })

      .state('private.admin.member.add', {
          templateUrl:'views/admin/new-member.html',
          controller: 'MemberController',
          parent: 'private.admin.member'
      });
}]);
