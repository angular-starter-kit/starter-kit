module main {

  'use strict';

  declare var _: any;

  /**
   * Wraps external global libraries into AngularJS injection system.
   * global window: false
   */
  angular
    .module('main')
    .constant('_', _); // Lodash

}
