'use strict';

/**
 * Wraps d3.js into an angular module.
 */
angular.module('d3', []).factory('d3', function ($window) {
  // assumes d3 has already been loaded on the page
  return $window.d3;
});
