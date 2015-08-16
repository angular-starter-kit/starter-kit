(function() {

  'use strict';

  angular
    .module('webServices')
    .factory('quoteService', quoteService);

  /**
   * Quote service: allows to get quote of the day.
   */
  function quoteService($q,
                        restService) {

    /*
     * Constants
     */

    var ROUTES = {
      randomJoke: '/jokes/random?limitTo=[nerdy]'
    };

    /*
     * Public interface
     */

    var service = {};

    /**
     * Get a random Chuck Norris joke.
     * @return {Object} The promise.
     */
    service.getRandomJoke = function() {
      return restService
        .get(ROUTES.randomJoke, null, true)
        .then(function(response) {
          if (response.data && response.data.value) {
            return response.data.value.joke.replace(/&quot;/g, '"');
          }
          return $q.reject({});
        })
        .catch(function() {
          return 'Error, could not load joke :-(';
        });
    };

    return service;

  }

})();
