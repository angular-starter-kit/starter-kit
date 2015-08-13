'use strict';

/**
 * Loading directive: displays a loading indicator while data is being loaded.
 *
 * Example usage: <div se-loading="isInitialized"></div>
 * The expected value of the directive attribute is a boolean indicating whether the content has been initialized or not.
 *
 * Additional parameter attributes:
 * - message: the loading message to display (none by default)
 *
 * Example: <div se-loading="isInitialized" message="Loading..."></div>
 *
 * Additional styles (to be put in class attribute):
 * - loading-space-top: adds a medium margin on top of the loading indicator
 * - loading-small: reduce the size of the loading indicator & message
 * - loading-overlay: displays the loading indicator & message as an overlay to the current view (there must be a positioned parent in the DOM to use this)
 */
angular.module('loadingDirective', []).directive('seLoading', function () {
  return {
    restrict: 'A',
    templateUrl: 'modules/ui-components/loading-directive/loading-directive.view.html',
    scope: {
      message: '=',
      isInitialized: '=seLoading'
    }
  };
});
