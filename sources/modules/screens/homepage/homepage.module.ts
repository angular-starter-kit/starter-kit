'use strict';

/**
 * home controller.
 */

module homepage {
  'use strict';

   angular
    .module('homepage', ['ui.router', 'logger', 'cacheService'])
    .controller('HomeController', HomeController);

}
