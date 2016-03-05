module app {

  'use strict';

  /**
   * Entry point of the application.
   * Initializes application and root controller.
   */
  function main($window: any,
                $timeout: ng.ITimeoutService,
                $locale: ng.ILocaleService,
                $state: angular.ui.IStateService,
                $rootScope: any,
                $ionicPlatform: ionic.platform.IonicPlatformService,
                $cordovaKeyboard: any,
                gettextCatalog: angular.gettext.gettextCatalog,
                _: _.LoDashStatic,
                config: any,
                logger: LoggerService,
                restService: RestService) {

    /*
     * Root view model
     */

    let vm = $rootScope;

    vm.pageTitle = '';
    vm.viewTitle = '';

    /**
     * Utility method to set the language in the tools requiring it.
     * @param {string=} language The IETF language tag.
     */
    vm.setLanguage = function(language?: string) {
      let isSupportedLanguage = _.includes(config.supportedLanguages, language);

      // Fallback if language is not supported
      if (!isSupportedLanguage) {
        language = 'en-US';
      }

      // Configure translation with gettext
      gettextCatalog.setCurrentLanguage(language);
      $locale.id = language;
    };

    /**
     * Updates title on view change.
     */
    vm.$on('$stateChangeSuccess', (event: any, toState: angular.ui.IState) => {
      updateTitle(toState.data ? toState.data.title : null);
    });

    /**
     * Updates title on language change.
     */
    vm.$on('gettextLanguageChanged', () => {
      updateTitle($state.current.data ? $state.current.data.title : null);
    });

    init();

    /*
     * Internal
     */

    /**
     * Initializes the root controller.
     */
    function init() {
      let _logger: ILogger = logger.getLogger('main');

      // Enable debug mode for translations
      gettextCatalog.debug = config.debug;

      vm.setLanguage();

      // Set REST server configuration
      restService.setServer(config.debug ? config.server.development : config.server.production);

      // Cordova platform and plugins init
      $ionicPlatform.ready(() => {

        // Hide splash screen
        let splashScreen = $window.navigator.splashscreen;
        if (splashScreen) {
          $timeout(() => {
            splashScreen.hide();
          }, 1000);
        }

        // Detect and set default language
        let globalization = $window.navigator.globalization;
        if (globalization) {
          // Use cordova plugin to retrieve device's locale
          globalization.getPreferredLanguage((language: string) => {
            _logger.log('Setting device locale "' + language + '" as default language');
            vm.$apply(() => {
              vm.setLanguage(language);
            });
          }, null);
        }

        if ($window.cordova && $window.cordova.plugins.Keyboard) {
          // Hide the accessory bar (remove this to show the accessory bar above the keyboard for form inputs)
          $cordovaKeyboard.hideAccessoryBar(true);
          $cordovaKeyboard.disableScroll(true);
        }

      });

    }

    /**
     * Updates the page and view title.
     * @param {?string=} stateTitle Title of current state, to be translated.
     */
    function updateTitle(stateTitle?: string) {
      vm.pageTitle = gettextCatalog.getString('APP_NAME');

      if (stateTitle) {
        vm.viewTitle = gettextCatalog.getString(stateTitle);
        vm.pageTitle += ' | ' + vm.viewTitle;
      }
    }

  }

  angular
    .module('app')
    .run(main);

}
