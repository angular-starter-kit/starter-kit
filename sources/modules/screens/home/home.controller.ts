module app {

  'use strict';

  /**
   * Displays the home screen.
   */
  export class HomeController {

    isLoading: boolean = true;
    quote: any = null;

    private logger: ILogger;
    private quoteService: QuoteService;

    /* @ngInject */
    constructor(logger: LoggerService,
                quoteService: QuoteService) {

      this.logger = logger.getLogger('home');
      this.quoteService = quoteService;

      this.init();
    }

    /**
     * Initializes controller.
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
    .module('app')
    .controller('homeController', HomeController);

}
