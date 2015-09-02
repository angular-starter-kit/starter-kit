'use strict';

module quoteService {
  'use strict';

  export class QuoteService {

      private ROUTES: any = {
        randomJoke: '/jokes/random?limitTo=[nerdy]'
      };

      private $q: ng.IQService;
      private restService: any;

      constructor($q: ng.IQService, restService: any) {
        this.$q = $q;
        this.restService = restService;
      }

      public getRandomJoke(): any {
        return this.restService
          .get(this.ROUTES.randomJoke, null, true)
          .then(function(response: any) {
            if (response.data && response.data.value) {
              return response.data.value.joke.replace(/&quot;/g, '"');
            }
            return this.$q.reject({});
          })
          .catch(function() {
            return 'Error, could not load joke :-(';
          });
      }
  }

  angular
    .module('webServices')
    .factory('quoteService', ['$q', 'restService', ($q: ng.IQService, restService: any) =>
      new quoteService.QuoteService($q, restService)]);
};
