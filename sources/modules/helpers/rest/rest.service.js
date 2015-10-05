(function() {

  'use strict';

  angular
    .module('app')
    .factory('restService', restService);

  /**
   * REST service: provides methods to perform REST requests.
   */
  function restService($q,
                       $http,
                       logger,
                       cacheService) {

    logger = logger.getLogger('restService');

    /*
     * Public interface
     */

    var service = {};

    /**
     * Executes a GET request.
     * @param {!String} url URL of the REST service call.
     * @param {?map=} params Map of strings or objects which will be turned to ?key1=value1&key2=value2 after the url.
     *   If the value is not a string, it will be JSONified.
     * @param {?boolean|'force'} cache If set to true, the first request will be cached, and next request with cache
     *   set to true will use the cached response.
     *   If set to 'force', the request will always be made and cache will be updated.
     *   If set to false or omitted, no cache will be set or used.
     * @param {?Object=} options Additional options for request/error handlers.
     * @return {Object} The promise.
     */
    service.get = function(url, params, cache, options) {
      var apiUrl = baseUri + url;
      var promiseBuilder = function() {
        return $http.get(apiUrl, {params: params});
      };

      if (!cache) {
        // Do not use cache
        return createRequest(promiseBuilder, options);
      } else {
        var cachedData = cache === 'force' ? null : cacheService.getCacheData(url, params);

        if (cachedData !== null) {
          cachedData = cacheHandler(cachedData);
        }

        if (cachedData === null) {
          logger.log('GET request: ' + url);

          // Update cache entry
          return createRequest(promiseBuilder, options).then(function(response) {
            cacheService.setCacheData(url, params, response);
            return angular.copy(response);
          });
        } else {
          // Use cached version
          var deferred = $q.defer();
          deferred.resolve(angular.copy(cachedData));

          return errorHandler(deferred.promise, options);
        }
      }
    };

    /**
     * Executes a POST request.
     * @param {!String} url URL of the REST service call.
     * @param {String|Object} data Data to be sent as the request message data.
     * @param {?Object=} options Additional options for request/error handlers.
     * @return {Object} The promise.
     */
    service.post = function(url, data, options) {
      logger.log('POST request: ' + url);

      var promiseBuilder = function() {
        return $http.post(baseUri + url, data, defaultConfig);
      };

      return createRequest(promiseBuilder, options);
    };

    /**
     * Executes a PUT request.
     * @param {!String} url URL of the REST service call.
     * @param {String|Object} data Data to be sent as the request message data.
     * @param {?Object=} options Additional options for request/error handlers.
     * @return {Object} The promise.
     */
    service.put = function(url, data, options) {
      logger.log('PUT request: ' + url);

      var promise = function() {
        return $http.put(baseUri + url, data, defaultConfig);
      };
      return createRequest(promise, options);
    };

    /**
     * Executes a DELETE request.
     * @param {!String} url URL of the REST service call.
     * @param {?Object=} options Additional options for request/error handlers.
     * @return {Object} The promise.
     */
    service.delete = function(url, options) {
      logger.log('DELETE request: ' + url);

      var promise = function() {
        return $http.delete(baseUri + url, defaultConfig);
      };
      return createRequest(promise, options);
    };

    /**
     * Sets the current server configuration.
     * A server parameter must contains at least these two strings:
     * - restServerUrl: The base URL of the server
     * - restUri: The REST URI access point
     * @param {!Object} server The server configuration.
     */
    service.setServer = function(server) {
      baseServer = server;
      baseUri = server.restServerUrl + server.restUri;
    };

    /**
     * Returns the current server configuration.
     * @return {String} The server base URL.
     */
    service.getServer = function() {
      return baseServer;
    };

    /**
     * Returns the base URI.
     * @return {String} The computed base URI.
     */
    service.getBaseUri = function() {
      return baseUri;
    };

    /**
     * Sets a customized request handler function for all requests.
     * The function should have the following signature, and return a promise:
     * function requestHandler(requestBuilder, options) {
     *   return requestBuilder();
     * }
     * The requestBuilder parameter is a function that returns the request promise.
     * The options parameter is an optional object containing whatever options your handler may needs.
     * @param {!function} requestHandlerFunc The request handler.
     */
    service.setRequestHandler = function(requestHandlerFunc) {
      requestHandler = requestHandlerFunc;
    };

    /**
     * Gets the current request handler function.
     * @return {function} The request handler.
     */
    service.getRequestHandler = function() {
      return requestHandler;
    };

    /**
     * Sets a customized default error handler function for all requests.
     * The function should have the following signature, and return a promise:
     * function errorHandler(promise, options) {
     *   return promise.catch(response, function() {
     *      ...
     *      return $q.reject(response);
     *   });
     * }
     * The promise parameter is the request promise.
     * The options parameter is an optional object containing whatever options your handler may needs.
     * @param {!function} errorHandlerFunc The error handler.
     */
    service.setErrorHandler = function(errorHandlerFunc) {
      errorHandler = errorHandlerFunc;
    };

    /**
     * Gets the current error handler function.
     * @return {function} The error handler.
     */
    service.getErrorHandler = function() {
      return errorHandler;
    };

    /**
     * Sets a customized default cache handler function for all cached requests.
     * The function should have the following signature, and return an object:
     * function cacheHandler(cachedData) {
     *    return isValid(cachedData) ? cachedData : null;
     * }
     * This handler is only called before for requests that would return cached data otherwise.
     * @param {!function} cacheHandlerFunc The cache handler.
     */
    service.setCacheHandler = function(cacheHandlerFunc) {
      cacheHandler = cacheHandlerFunc;
    };

    /**
     * Gets the current cache handler function.
     * @return {function} The cache handler.
     */
    service.getCacheHandler = function() {
      return cacheHandler;
    };

    /*
     * Internal
     */

    var baseServer = '';
    var baseUri = '';
    var defaultConfig = {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Headers': 'content-type'
      }
    };

    /**
     * Default request handler, that just builds the promise.
     * @param {!function} requestBuilder A function that return the request's promise.
     * @return {Object} The promise.
     * @type {function}
     */
    var requestHandler = function(requestBuilder) {
      // Default request handler just builds the request
      return requestBuilder();
    };

    /**
     * Default error handler.
     * This handler tries to extract a description of the error and logs and error with it.
     * @param {!Object} promise The promise to handle errors.
     * @param {?Object=} options Additional options: if 'skipErrors' property is set to true, errors will not be
     *   handled.
     * @type {function}
     */
    var errorHandler = function(promise, options) {
      if (!options || !options.skipErrors) {
        promise.catch(function(response) {
          var error;

          if (response.status === 404) {
            error = 'Server unavailable or URL does not exist';
          } else if (response.data) {
            var message = response.data.message ? response.data.message : null;
            var code = response.data.error ? response.data.error : null;
            error = message || code || angular.toJson(response.data);
          }

          if (error) {
            logger.error(error);
          }

          return $q.reject(response);
        });
      }
      return promise;
    };

    /**
     * Defaults cache handler.
     * This handler just return the specified cache data and does nothing.
     * @type {Function}
     */
    var cacheHandler = angular.identity;

    /**
     * Creates the request.
     * @param {!function} requestBuilder A function that return the request's promise.
     * @param {?Object=} options Additional options for request/error handlers.
     * @return {Object} The promise.
     */
    function createRequest(requestBuilder, options) {
      return errorHandler(requestHandler(requestBuilder, options), options);
    }

    return service;
  }

})();
