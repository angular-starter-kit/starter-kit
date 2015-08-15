(function() {

  'use strict';

  /**
   * Wraps external global libraries into AngularJS injection system.
   * global window: false
   */
  angular
    .module('main')
    .constant('_', window._); // lodash

})();
