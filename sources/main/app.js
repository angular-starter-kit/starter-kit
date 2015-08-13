/**
 * Entry point of the application.
 */

(function() {
  'use strict';

  function runBlock($log, toastr, gettextCatalog) {
    // Set options third-party lib
    toastr.options.timeOut = 3000;
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;

    gettextCatalog.setCurrentLanguage('en-US');

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
        templateUrl: 'modules/shell/shell.html',
        controller: 'ShellController',
        controllerAs: 'shell'
    })
    .state('app.home', {
        url: '/',
        templateUrl: 'modules/screens/homepage/homepage.html',
        controller: 'HomeController'
    })
    .state('app.about', {
        url: '/about',
        templateUrl: 'modules/screens/about/about.html',
        controller: 'AboutController'
    });
  }

  // Declare the translations module because angular-gettext does not create it.
  angular.module('translations', ['gettext']);

  angular.module('app', [
    // base
    'ngAnimate',
    'ngSanitize',
    'ui.router',

    // generated modules
    'translations',
    'views',

    // helpers
    'logger',

    // plugins
    'toastr',
    'gettext',

    // screens
    'homepage',
    'about',
    'shell',
    'cacheService',

    // settings
    'config'
    ])
    .run(runBlock)
    .config(configBlock);

})();
