'use strict';

/**
 * User service: allows to manage users of the application.
 */
angular.module('saidnoService', ['restService'])

  .factory('saidnoService', function(restService, $http, $q) {

    /*
     * Service internals
     */

    var routes = {
      qod: 'http://api.theysaidso.com/qod.json',
    };

    /*
     * Service public interface
     */

    var service = {};

    /**
     * Logs in the user in the Facility Insights system.
     * @param {!string} username The user name.
     * @param {!string} password The user password.
     * @return {Object} The promise.
     */
    service.query = function() {
      return $http.get(routes.qod);
    };

    return service;
  });
