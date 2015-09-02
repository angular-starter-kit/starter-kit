module home {

  'use strict';

  export class HomeController {

    public isLoading: boolean= true;
    public quote: any = null;

    private logger: any;
    private quoteService: any;

    /* @ngInject */
    constructor (quoteService: any, logger: any) {
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
      this.logger.log('init');

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
