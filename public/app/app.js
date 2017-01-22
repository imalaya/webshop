var webShop = angular.module('webShop', ['ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngFileUpload', 'ngTouch']);


webShop.config(['$stateProvider', '$urlRouterProvider'/*,'$locationProvider'*/, function($stateProvider, $urlRouterProvider/*, $locationProvider*/){

            $urlRouterProvider
                .otherwise('/home' );

/*
        webShop.run(['$rootScope', '$location', '$cookies', '$http', function($rootScope, $location, $cookies, $http) {
            // keep user logged in after page refresh
            $rootScope.globals = $cookies.getObject('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
            }

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // redirect to login page if not logged in and trying to access a restricted page
                var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
                var loggedIn = $rootScope.globals.currentUser;
                if (restrictedPage && !loggedIn) {
                    $location.path('/login');
                }
            }); */

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

      .state('public.site.startpage', {
          url: '/startseite',
          templateUrl: 'views/customer/content-startpage.html'
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
      .state('restricted', {
          abstract: true,
          template: "<ui-view/>"
      })

      .state('restricted.login', {
          url: '/login',
          templateUrl: 'views/admin/login/login.html',
          controller: 'LoginController',
          controllerAs: 'auth'
      })

    $stateProvider
    .state('private', {
      abstract: true,
      template: "<ui-view/>"
    })

    .state('private.admin', {
        templateUrl:'views/admin/home-admin.html'
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
