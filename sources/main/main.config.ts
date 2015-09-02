module main {

  'use strict';

  angular
    .module('main')
    .config(mainConfig);

  /**
   * Configures the application (before running).
   */
  function mainConfig($stateProvider: any,
                      $urlRouterProvider: any,
                      $provide: any,
                      config: any) {

    // Extend the $exceptionHandler service to output logs.
    $provide.decorator('$exceptionHandler', function($delegate: any, $injector: any) {
      return function(exception: any, cause: any) {
        $delegate(exception, cause);

        var logger = $injector.get('logger').getLogger('exceptionHandler');
        logger.error(exception + (cause ? ' (' + cause + ')' : ''));
      };
    });

    // Disable debug logs in production version
    $provide.decorator('$log', function($delegate: any) {
      if (!config.debug) {
        $delegate.log = function() {
          //
        };
        $delegate.debug = function() {
          //
        };
      }
      return $delegate;
    });

    // Routes configuration
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('app', {
        templateUrl: 'modules/shell/shell.html',
        controller: 'shellController as vm'
      })
      .state('app.home', {
        url: '/',
        templateUrl: 'modules/screens/home/home.html',
        controller: 'homeController as vm'
      })
      .state('app.about', {
        url: '/about',
        templateUrl: 'modules/screens/about/about.html',
        controller: 'aboutController as vm'
      });
  }

}

