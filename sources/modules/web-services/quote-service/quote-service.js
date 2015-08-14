'use strict';

/**
 * Quote service: allows to get quote of the day.
 */
angular
  .module('quoteService', [
    'restService'
  ])
  .factory('quoteService', function(restService) {

    /*
     * Service public interface
     */

    var service = {};

    /**
     * Get the quote of the day.
     * @return {Object} The promise.
     */
    service.getQuoteOfTheDay = function() {
      return restService
        .get(routes.quoteOfTheDay, null, true)
        .then(function(response) {
          return response.data.quotes[0];
        });
    };

    /*
     * Service internals
     */

    var routes = {
      quoteOfTheDay: 'http://api.theysaidso.com/qod.json'
    };

    return service;
  });
