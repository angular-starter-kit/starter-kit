module about {

  'use strict';

  /**
   * Displays the about screen.
   */
  export class AboutController {

    version: string;

    private logger: logger.Logger;
    private config: any;

    /* @ngInject */
    constructor(logger: logger.LoggerService,
                config: any) {

      this.logger = logger.getLogger('about');
      this.config = config;

      this.init();
    }

    /*
     * Internal
     */

    /**
     * Init controller.
     */
    private init() {
      this.version = this.config.version;
      this.logger.log('init', null);
    }

  }

  angular
    .module('about')
    .controller('aboutController', AboutController);

}
