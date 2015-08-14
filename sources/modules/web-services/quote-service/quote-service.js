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
      return restService.get(routes.quoteOfTheDay);
    };
    
    /*
     * Service internals
     */

    var routes = {
      quoteOfTheDay: 'http://api.theysaidso.com/qod.json',
    };

    return service;
  });
