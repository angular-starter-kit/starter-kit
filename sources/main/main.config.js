(function() {

  'use strict';

  angular
    .module('app')
    .config(mainConfig);

  /**
   * Configures the application (before running).
   */
  function mainConfig($stateProvider,
                      $urlRouterProvider,
                      $provide,
                      config) {

    // Extend the $exceptionHandler service to output logs.
    $provide.decorator('$exceptionHandler', function($delegate, $injector) {
      return function(exception, cause) {
        $delegate(exception, cause);

        var logger = $injector.get('logger').getLogger('exceptionHandler');
        logger.error(exception + (cause ? ' (' + cause + ')' : ''));
      };
    });

    // Disable debug logs in production version
    $provide.decorator('$log', function($delegate) {
      if (!config.debug) {
        $delegate.log = angular.noop;
        $delegate.debug = angular.noop;
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

})();

