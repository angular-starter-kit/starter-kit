module home {

  'use strict';

  /**
   * Displays the home screen.
   */
  export class HomeController {

    isLoading: boolean = true;
    quote: any = null;

    private logger: logger.Logger;
    private quoteService: quoteService.QuoteService;

    /* @ngInject */
    constructor(quoteService: quoteService.QuoteService, logger: logger.LoggerService) {
      this.logger = logger.getLogger('home');
      this.quoteService = quoteService;

      this.init();
    }

    /*
     * Internal
     */

    /**
     * Init controller.
     */
    private init() {
      this.logger.log('init', null);

      var vm = this;

      this.quoteService
        .getRandomJoke()
        .then(function (quote: any) {
          vm.quote = quote;
          vm.isLoading = false;
        });
    }

  }

  angular
    .module('home')
    .controller('homeController', home.HomeController);

}
