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

  function configBlock($stateProvider, $urlRouterProvider, $provide, config) {

    // Extend the $exceptionHandler service to output logs.
    $provide.decorator('$exceptionHandler', function ($delegate, $injector) {
        return function (exception, cause) {
          $delegate(exception, cause);

          var logger = $injector.get('logger').getLogger('exceptionHandler');
          logger.error(exception + (cause ? ' (' + cause + ')' : ''));
        };
    });

    // Disable debug logs in production version
    $provide.decorator('$log', function($delegate) {
      if (!config.debug) {
        $delegate.log = function() {};
        $delegate.debug = function() {};
      }
      return $delegate;
    });

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

  angular.module('app', [
    // base
    'ngAnimate',
    'ngSanitize',
    'ui.router',

    // generated modules
    //'translations',

    // helpers
    'logger',

    // plugins
    'toastr',
    'gettext',
    'malarkey',

    // screens
    'homepage',

    // settings
    'config'
    ])
    .run(runBlock)
    .config(configBlock);

})();
