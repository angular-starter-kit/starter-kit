'use strict';

/**
 * Wraps malarkey.js into an angular module.
 */
angular.module('malarkey', []).factory('malarkey', function ($window) {
  // assumes malarkey has already been loaded on the page
  return $window.malarkey;
});
