'use strict';

/**
 * @ngdoc directive
 * @name uiLoading
 * @description
 *   Loading directive: displays a loading indicator while data is being loaded.
 * @param {Boolean} ui-loading
 *   When True show the content.
 * @param {String} message
 *   The loading message to display (none by default).
 * @example
 *   <div ui-loading="isLoading" message="Loading..."></div>
 */
angular
  .module('loading', [])
  .directive('uiLoading', function () {
    return {
      restrict: 'A',
      templateUrl: 'modules/ui-components/loading/loading-directive.html',
      scope: {
        message: '=',
        isLoading: '=uiLoading'
      }
    };
  });
