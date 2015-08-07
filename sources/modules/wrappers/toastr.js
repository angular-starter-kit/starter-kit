'use strict';

/**
 * Wraps toastr.js into an angular module.
 */
angular.module('toastr', []).factory('toastr', function ($window) {
  // assumes toastr has already been loaded on the page
  return $window.toastr;
});
