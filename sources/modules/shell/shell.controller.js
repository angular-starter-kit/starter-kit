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
                           $rootScope,
                           $scope,
                           logger,
                           config) {

    logger = logger.getLogger('shell');

    /*
     * View model
     */

    var vm = this;

    vm.state = $state.current.name;
    vm.currentLanguage = $locale.id;
    vm.languages = config.supportedLanguages;

    init();

    /*
     * Watches
     */

    $scope.$watch('currentLanguage', function() {
      $rootScope.setLanguage($scope.currentLanguage);
    });

    /*
     * Internal
     */

    /**
     * Init controller.
     */
    function init() {
      logger.log('init');
      logger.log($state.current.name);
    }

  }

})();
