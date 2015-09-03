module about {

  'use strict';

  export class AboutController {

    public version: string;

    private logger: logger.Logger;
    private config: any;

    /* @ngInject */
    constructor (logger: logger.LoggerService, config: any) {
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

}
