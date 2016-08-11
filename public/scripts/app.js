'use strict';
/**
 * @ngdoc overview
 * @name mstApp
 * @description
 * # mstApp
 *
 * Main module of the application.
 */

angular
  .module('myApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider','$locationProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider,$locationProvider) {
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/index/home');

    $stateProvider
      .state('index', {
        url:'/index',
        templateUrl: 'views/home/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'scripts/directives/header/header.js',
                    'scripts/directives/sidebar/sidebar.js',
                    'scripts/directives/footer/footer.js',
                    'scripts/directives/common/programServices.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["vendor/angular-toggle-switch/angular-toggle-switch.min.js",
                          "vendor/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                })
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['vendor/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['vendor/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['vendor/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['vendor/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['vendor/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('index.home',{
        url:'/home',
        templateUrl:'views/home/home.html'
       
      })

     .state('index.courses',{
        url:'/courses',
        templateUrl:'views/home/courses.html'
       
      })

      .state('index.register',{
        url:'/register?token',
        controller:"RegisterCtrl",
        templateUrl:'views/home/register.html',
        resolve:{
          loadMyCtrl:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:['scripts/controllers/registerCtrl.js']
                })
            }
        },
      })

      .state('index.thanks',{
        url:'/thanks',
        templateUrl:'views/home/thanks.html'
       
      })

      .state('site',{
        url:'/courses',
        templateUrl:'views/home/courses.html'
       
      })

      $locationProvider.html5Mode(true);
  }]).run(function($rootScope, $location,$state,$timeout) {
      $rootScope.$on('$viewContentLoaded', function(event) {
        $timeout(function() {
            var str = $location.$$path,
                page = str.replace("/", "").split("/").join(".");
           $rootScope.showSideBar = (page == 'index.register' || page == 'index.thanks') ? false : true;
          },0);
     });
  });