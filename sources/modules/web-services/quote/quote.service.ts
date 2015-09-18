module quoteService {

  'use strict';

  interface IRoutes {
    randomJoke: string;
  }

  /**
   * Quote service: allows to get quote of the day.
   */
  export class QuoteService {

    private ROUTES: IRoutes = {
      randomJoke: '/jokes/random?limitTo=[nerdy]'
    };

    private $q: ng.IQService;
    private restService: restService.RestService;

    constructor($q: ng.IQService,
                restService: restService.RestService) {

      this.$q = $q;
      this.restService = restService;
    }

    /**
     * Get a random Chuck Norris joke.
     * @return {Object} The promise.
     */
    getRandomJoke(): any {
      return this.restService
        .get(this.ROUTES.randomJoke, null, true, null)
        .then(function (response: any) {
          if (response.data && response.data.value) {
            return response.data.value.joke.replace(/&quot;/g, '"');
          }
          return this.$q.reject({});
        })
        .catch(function () {
          return 'Error, could not load joke :-(';
        });
    }

  }

  angular
    .module('webServices')
    .service('quoteService', QuoteService);

}
