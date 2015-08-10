'use strict';

/**
 * defines app constants.
 */

module config {
  'use strict ';

  export class Config {

    public debug: boolean;
    public devConsole: boolean;

    /* @ngInject */
    constructor () {
      this.debug = true;
      this.devConsole = false;
    }

  }

  angular
    .module('config', ['ui.router', 'logger'])
    .constant('config', Config);

}
