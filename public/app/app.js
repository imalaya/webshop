var webShop = angular.module('webShop', ['ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngFileUpload', 'ngTouch', 'auth0', 'angular-storage', 'angular-jwt']);


webShop.config(function($stateProvider, $urlRouterProvider, authProvider, $provide, $httpProvider, jwtInterceptorProvider) {

    authProvider.init({
        domain: 'angularjs-webshop.eu.auth0.com',
        clientID: 'isUbGeB1HMvLalvQ9U6G69vBQwnQaFpZ'
    });

    jwtInterceptorProvider.tokenGetter = function(store) {
        return store.get('id_token');
    }

    $urlRouterProvider.otherwise('/home' );

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
      .state('login', {
          url: '/login',
          templateUrl: 'views/admin/login/login.html',
          controllerAs: 'LoginController as user'
      });

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
    /*
    function redirect($q, $injector, auth, store, $location) {
        return {
            responseError: function(rejection) {

                if(rejection.status === 401) {
                    auth.signout();
                    store.remove('profile');
                    store.remove('id_token');
                    $location.path('/login');
                }

                return $q.reject(rejection);
            }
        }
    }

    $provide.factory('redirect', redirect);
    $httpProvider.interceptors.push('redirect');
    $httpProvider.interceptors.push('jwtInterceptor'); */
  })
    //Any time the routing changes (refreshing happens)
    // the $rootScope watches and finds out what state the user has
    //if the token of the user is not expired and if the user is not authenticate
    //the user gets authenticated
    // else: the user gets redirected to login in order to login again
    .run(function($rootScope, auth, store, jwtHelper, $location) {
        $rootScope.$on('$locationChangeStart', function() {

            var token = store.get('id_token');
            if (token) {
                if(!jwtHelper.isTokenExpired(token)) {
                    if(!auth.isAuthenticated) {
                        auth.authenticate(store.get('profile'), token);
                    }
                }
            } else {
                $location.path('/home');
            }
        })
    });

