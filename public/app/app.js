var webShop = angular.module('webShop', ['ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngFileUpload', 'ngTouch']);


webShop.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
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
        .state('public.site.category', {
            url: '/artikel-kategorie/{category}',
            templateUrl:'views/customer/articleCategory.html',
            controller: 'ArticleCategory'
        })

        .state('public.site.details', {
            url: '/artikel/{id}',
            templateUrl:'views/customer/article-details.html',
            controller: 'ArticleDetailsCtrl'
        })

        .state('public.site.startpage', {
            url: '/startseite',
            templateUrl: 'views/customer/content-startpage.html'
        })

        //anchor tags footer
        .state('public.site.contact', {
            url: '/contact',
            templateUrl:'views/customer/footer/contact.html',
            controller: 'ContactController'
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
    $urlRouterProvider.otherwise('/home');


  $stateProvider
    .state('private', {
      abstract: true,
      template: "<ui-view/>"
    })

    .state('private.admin', {
        templateUrl:'views/admin/home-admin.html'
      })

      .state('private.admin.login', {
          url: '/login',
          templateUrl:'views/admin/login.html'
      })

     .state('private.admin.dashboard', {
        url: '/admin',
        templateUrl:'views/admin/member-calendar.html'
      })

    .state('private.admin.inventory', {
        url: '/artikel-verwalten',
        templateUrl:'views/admin/manage-articles.html',
        controller: 'InventoryController'
      })

      .state('private.admin.test', {
          url: '/test',
          templateUrl:'views/admin/test.html',
          controller: 'TestController'
        })

      .state('private.admin.inventory.add', {
          templateUrl:'views/admin/new-article.html',
          controller: 'InventoryController',
          parent: 'private.admin.inventory'
        })

        .state('private.admin.inventory.edit', {
            url:'/artikel/{article.id}',
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
