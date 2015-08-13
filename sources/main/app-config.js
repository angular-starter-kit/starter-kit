'use strict';

/**
 * Defines app-level configuration.
 */
angular
  .module('app')
  .constant('config', {
    // Debug mode: automatically switched to false when built using gulp
    'debug': true,
    'version': '0.9',
    'supportedLanguages': [
      'en-US',
      'fr-FR'
    ],
  });
