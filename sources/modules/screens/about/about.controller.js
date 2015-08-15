(function() {

  'use strict';

  angular
    .module('about')
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

    init();

    /*
     * Internal
     */

    /**
     * Init controller.
     */
    function init() {
      logger.log('init');
    }

  }

})();
