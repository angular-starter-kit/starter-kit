'use strict';

/**
 * Defines app constants.
 */
angular.module('config', [])
  .constant('config', {
    // Debug mode: automatically switched to false when built using gulp
    'debug': true,
    // Show in-app developer console
    'devConsole': false,
});
