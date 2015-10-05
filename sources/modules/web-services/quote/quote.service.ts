module app {

  'use strict';

  /**
   * Quote service: allows to get quote of the day.
   */
  export class QuoteService {

    private ROUTES = {
      randomJoke: '/jokes/random?limitTo=[nerdy]'
    };

    private $q: ng.IQService;
    private restService: RestService;

    /* @ngInject */
    constructor($q: ng.IQService,
                restService: RestService) {

      this.$q = $q;
      this.restService = restService;
    }

    /**
     * Get a random Chuck Norris joke.
     * @return {Object} The promise.
     */
    getRandomJoke(): ng.IPromise<string> {
      return this.restService
        .get(this.ROUTES.randomJoke, null, true)
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
    .module('app')
    .service('quoteService', QuoteService);

}
