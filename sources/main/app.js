'use strict';

// Declare the translations module because angular-gettext does not create it.
angular.module('translations', ['gettext']);

/*
 * Entry point of the application.
 * Only declare here global modules needed for the application to start.
 * These modules should be kept to minimum.
 */
angular.module('app', [
  // Dependencies
  'gettext',
  'ngAnimate',
  'ngSanitize',
  'ui.router',

  // Generated modules
  'translations',
  'views',

  // Base modules (needed for root controller)
  'logger',
  'config',

  // Screens
  'homepage',
  'about',
  'shell',
  'cacheService',
  'restService',

  // wrappers
  'lodash'
]);

/*
 * Configures the application (before running).
 */
angular
  .module('app')
  .config(function ($stateProvider,
                    $urlRouterProvider,
                    $provide,
                    config) {

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

    // Default redirection
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('app', {
          templateUrl: 'modules/shell/shell.html',
          controller: 'shellController',
          controllerAs: 'shell'
      })
      .state('app.home', {
          url: '/',
          templateUrl: 'modules/screens/homepage/homepage.html',
          controller: 'homeController'
      })
      .state('app.about', {
          url: '/about',
          templateUrl: 'modules/screens/about/about.html',
          controller: 'aboutController'
      });
  });

/*
 * Initializes the application and root controller.
 */
angular
  .module('app')
  .run(function (gettextCatalog, _, config, $locale) {

    /**
     * Utility method to set the language in the tools requiring it.
     * @param {String} language The IETF language tag.
     */
    function setLanguage(language) {
      var isSupportedLanguage = _.contains(config.supportedLanguages, language);

      // Fallback if language is not supported
      if (!isSupportedLanguage) {
        language = 'en-US';
      }

      // Configure translation with gettext
      gettextCatalog.setCurrentLanguage(language);
      $locale.id = language;
    }

    setLanguage();

  });
