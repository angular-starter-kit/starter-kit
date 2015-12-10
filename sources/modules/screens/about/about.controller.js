(function() {

  'use strict';

  angular
    .module('app')
    .controller('aboutController', AboutController);

  /**
   * Displays the about screen.
   * @constructor
   */
  function AboutController(logger,
                           config) {

    logger = logger.getLogger('about');

    /*
     * View model
     */

    var vm = this;

    vm.version = config.version;

    /*
     * Internal
     */

    /**
     * Init controller.
     */
    function init() {
      logger.log('init');
    }

    init();

  }

})();
