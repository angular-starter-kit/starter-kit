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
