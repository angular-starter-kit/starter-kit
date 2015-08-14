'use strict';

/**
 * Wraps lodash.js into an angular module.
 */
angular
  .module('lodash', [])
  .factory('_', function ($window) {
    // assumes lodash has already been loaded on the page
    return $window._;
  });
