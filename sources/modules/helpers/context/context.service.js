(function() {

  'use strict';

  angular
    .module('app')
    .factory('contextService', contextService);

  /**
   * Context service: provides URL context injection based on specified context.
   */
  function contextService(logger) {

    logger = logger.getLogger('contextService');

    /*
     * Service public interface
     */

    var service = {};

    /**
     * Injects the specified context into the given REST API.
     * The REST API should be formatted like "/api/users/:userId".
     * Any fragment from the REST API starting with ":" will then be replaced by a property from the context with
     * the same name, i.e. for "/api/users/:userId" and a context object "{ userId: 123 }", the resulting URL will
     * be "/api/users/123".
     * @param {!string} restApi The REST API to fill will context values.
     * @param {Object} context The context to use.
     * @return {string} The ready-to-use REST API to call.
     */
    service.inject = function(restApi, context) {
      logger.log('Injecting context in: ' + restApi);

      if (!context) {
        throw 'inject: context must be defined';
      }

      // Search for context properties to inject
      var properties = restApi.match(/(:\w+)/g);

      angular.forEach(properties, function(property) {
        var contextVar = property.substring(1);
        var contextValue = context[contextVar];

        if (contextValue !== undefined) {
          contextValue = encodeURIComponent(contextValue);
          restApi = restApi.replace(property, contextValue);
          logger.log('Injected ' + contextValue + ' for ' + property);
        } else {
          throw 'inject: context.' + contextVar + ' expected but undefined';
        }
      });

      logger.log('Resulting REST API: ' + restApi);

      return restApi;
    };

    return service;

  }

})();
