(function() {

  'use strict';

  angular
    .module('app')
    .config(mainConfig);

  /**
   * Configures the application (before running).
   */
  function mainConfig($provide,
                      $compileProvider,
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

    // Disable angular debug info in production version
    $compileProvider.debugInfoEnabled(config.debug);

  }

})();

