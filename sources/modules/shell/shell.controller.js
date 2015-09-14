(function() {

  'use strict';

  angular
    .module('shell')
    .controller('shellController', ShellController);

  /**
   * Displays the SPA shell.
   * The shell contains the shared parts of the application: header, footer, navigation...
   * @constructor
   */
  function ShellController($locale,
                           $state,
                           logger,
                           config) {

    logger = logger.getLogger('shell');

    /*
     * View model
     */

    var vm = this;

    vm.currentLocale = $locale;
    vm.languages = config.supportedLanguages;
    vm.menuHidden = true;

    /**
     * Toggles navigation menu visibility on mobile platforms.
     */
    vm.toggleMenu = function() {
      vm.menuHidden = !vm.menuHidden;
    };

    /**
     * Checks if the specified state name is the current.
     * @param {string} name The state name to check.
     * @return {boolean} True if the specified state name is the current.
     */
    vm.isCurrentState = function(name) {
      return $state.current.name === name;
    };

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
