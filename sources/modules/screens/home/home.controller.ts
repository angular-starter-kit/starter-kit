module home {

  'use strict';

  export class HomeController {

    public isLoading: boolean= true;
    public quote: any = null;

    private logger: logger.Logger;
    private quoteService: quoteService.QuoteService;

    /* @ngInject */
    constructor (quoteService: quoteService.QuoteService, logger: logger.LoggerService) {
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
        .then(function(quote: any) {
          vm.quote = quote;
          vm.isLoading = false;
        });
    }
  }

}
