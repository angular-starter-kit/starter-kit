(function() {

  'use strict';

  angular
    .module('app')
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
     * Checks if the current state contains the specified name.
     * @param {string} name The state name to check.
     * @return {boolean} True if the current state contains the specified name.
     */
    vm.stateContains = function(name) {
      return $state.current.name.indexOf(name) !== -1;
    };

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
