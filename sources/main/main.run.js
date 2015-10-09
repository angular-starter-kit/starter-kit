(function() {

  'use strict';

  angular
    .module('app')
    .run(main);

  /**
   * Entry point of the application.
   * Initializes application and root controller.
   */
  function main($locale,
                $rootScope,
                gettextCatalog,
                _,
                config,
                restService) {

    /*
     * Root view model
     */

    /**
     * Utility method to set the language in the tools requiring it.
     * @param {string} language The IETF language tag.
     */
    $rootScope.setLanguage = function(language) {
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

})();
