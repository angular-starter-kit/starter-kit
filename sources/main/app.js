/**
 * Entry point of the application.
 */

(function() {
  'use strict';

  function runBlock($log, toastr) {
    // Set options third-party lib
    toastr.options.timeOut = 3000;
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;

    $log.debug('runBlock end');
  }

  function config($logProvider, $stateProvider, $urlRouterProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // default redirect
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('app', {
        url: '/',
        templateUrl: 'modules/screens/homepage/homepage.view.html',
        controller: 'homepageController'
    })
    .state('about', {
        url: '/about',
        templateUrl: 'modules/screens/about/about.view.html',
        controller: 'aboutController'
    });
  }

  angular
    .module('app', ['ngAnimate', 'ngSanitize', 'ui.router', 'toastr', 'homepage'])
    .run(runBlock)
    .config(config);

})();
