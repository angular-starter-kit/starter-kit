'use strict';

module main {

  'use strict';

  angular
    .module('main')
    .run(main);

  /**
   * Entry point of the application.
   * Initializes application and root controller.
   */
  function main($locale: any,
                $rootScope: any,
                gettextCatalog: any,
                _: any,
                config: any,
                restService: any) {

    /*
     * Root view model
     */

    /**
     * Utility method to set the language in the tools requiring it.
     * @param {String} language The IETF language tag.
     */
    $rootScope.setLanguage = function (language?: string) {
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

      $rootScope.setLanguage();

      // Set REST server configuration
      restService.setServer(config.server);
    }

  }

}
