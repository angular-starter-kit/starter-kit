'use strict';

/**
 * Wraps lodash.js into an angular module.
 */
angular.module('underscore', []).factory('_', function ($window) {
  // assumes lodash has already been loaded on the page
  return $window._;
});