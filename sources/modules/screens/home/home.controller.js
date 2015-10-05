(function() {

  'use strict';

  angular
    .module('app')
    .controller('homeController', HomeController);

  /**
   * Displays the home screen.
   * @constructor
   */
  function HomeController(logger,
                          quoteService) {

    logger = logger.getLogger('home');

    /*
     * View model
     */

    var vm = this;

    vm.isLoading = true;
    vm.quote = null;

    init();

    /*
     * Internal
     */

    /**
     * Init controller.
     */
    function init() {
      logger.log('init');

      quoteService
        .getRandomJoke()
        .then(function(quote) {
          vm.quote = quote;
          vm.isLoading = false;
        });
    }

  }

})();
