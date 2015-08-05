'use strict';

/**
 * User service: allows to manage users of the application.
 */
angular.module('userService', ['restService'])

  .factory('userService', function(restService) {

    /*
     * Service internals
     */

    var routes = {
      login: '/user/login',
      logout: '/user/logout',
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
    service.login = function(username, password) {
      var payload = {
        username: username,
        password: password
      };

      return restService.post(routes.login, angular.toJson(payload));
    };

    /**
     * Logs out the user from the current session.
     * @return {Object} The promise.
     */
    service.logout = function() {
      return restService.post(routes.logout);
    };

    return service;
  });