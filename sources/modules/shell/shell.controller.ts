module shell {
  'use strict';

  export class ShellController {

    public languages: any;
    public currentLocale: any;

    private logger: any;
    private $state: any;

    /* @ngInject */
    constructor ($locale: any, logger: any, config: any, $state : ng.ui.IStateService) {
      this.logger = logger.getLogger('shell');
      this.$state = $state;
      this.currentLocale = $locale;
      this.languages = config.supportedLanguages;
      this.init();
    }

    /**
     * Checks if the specified state name is the current.
     * @param {string} name The state name to check.
     * @return {boolean} True if the specified state name is the current.
     */
    public isCurrentState(name: string): boolean {
      return this.$state.current.name === name;
    };

    /*
     * Internal
     */

    /**
     * Init controller.
     */
    private init() {
      this.logger.log('init');
    }
  }

}
