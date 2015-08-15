(function() {

  'use strict';

  /**
   * Defines app-level configuration.
   */
  angular
    .module('main')
    .constant('config', {

      // DO NOT CHANGE: debug mode is automatically switched to false on gulp build
      'debug': true,

      // DO NOT CHANGE: app version is injected from package.json on gulp build
      'version': 'dev',

      // Supported languages
      'supportedLanguages': [
        'en-US',
        'fr-FR'
      ],

      // REST backend configuration, used for all web services
      server: {
        restServerUrl: '/',
        restUri: 'api/'
      }

    });

})();

