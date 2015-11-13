module app {

  'use strict';

  /**
   * Entry point of the application.
   * Initializes application and root controller.
   */
  function main($locale: ng.ILocaleService,
                $rootScope: any,
                gettextCatalog: angular.gettext.gettextCatalog,
                _: _.LoDashStatic,
                config: any,
                restService: RestService) {

    /*
     * Root view model
     */

    var vm = $rootScope;

    /**
     * Utility method to set the language in the tools requiring it.
     * @param {string=} language The IETF language tag.
     */
    vm.setLanguage = function(language?: string) {
      var isSupportedLanguage = _.contains(config.supportedLanguages, language);

      // Fallback if language is not supported
      if (!isSupportedLanguage) {
        language = 'en-US';
      }

      // Configure translation with gettext
      gettextCatalog.setCurrentLanguage(language);
      $locale.id = language;
    };

    init();

    /*
     * Internal
     */

    /**
     * Initializes the root controller.
     */
    function init() {
      // Enable debug mode for translations
      gettextCatalog.debug = config.debug;

      vm.setLanguage();
      vm.pageTitle = gettextCatalog.getString('T_APP_NAME');

      // Set REST server configuration
      restService.setServer(config.server);
    }

  }

  angular
    .module('app')
    .run(main);

}
