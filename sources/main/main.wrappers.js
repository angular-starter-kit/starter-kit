(function() {

  'use strict';

  /**
   * Wraps external global libraries into AngularJS injection system.
   * global window: false
   */
  angular
    .module('app')
    .constant('_', window._); // lodash

})();
