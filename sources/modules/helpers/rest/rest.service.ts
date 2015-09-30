module restService {

  'use strict';

  /**
   * REST service: provides methods to perform REST requests.
   */
  export class RestService {

      private baseServer: string = '';
      private baseUri: string = '';
      private defaultConfig: any = {
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Headers': 'content-type'
        }
      };

      /**
       * Defaults cache handler.
       * This handler just return the specified cache data and does nothing.
       * @type {Function}
       */
      private cacheHandler: any = angular.identity;
      private $q: ng.IQService ;
      private logger: logger.Logger;
      private $http: ng.IHttpService;
      private cacheService: cacheService.CacheService;

    /* @ngInject */
    constructor($q: ng.IQService, logger: logger.LoggerService, $http: ng.IHttpService, cacheService: cacheService.CacheService) {
        this.$q = $q;
        this.$http = $http;
        this.cacheService = cacheService;
        this.logger = logger.getLogger('restService');
      }

      /**
       * Executes a GET request.
       * @param {!String} url URL of the REST service call.
       * @param {?map=} params Map of strings or objects which will be turned to ?key1=value1&key2=value2 after the url. If the value is not a string, it will be
       *                       JSONified.
       * @param {?boolean|'force'} cache If set to true, the first request will be cached, and next request with cache set to true will use the cached response.
       *                                If set to 'force', the request will always be made and cache will be updated.
       *                                If set to false or omitted, no cache will be set or used.
       * @param {?Object=} options Additional options for request/error handlers.
       * @return {Object} The promise.
       */
      get(url: string, params: any, cache: any, options: any): any {
        var apiUrl = this.baseUri + url;
        var self = this;
        var promiseBuilder = function() {
          return self.$http.get(apiUrl, { params: params });
        };

        if (!cache) {
          // Do not use cache
          return this.createRequest(promiseBuilder, options);
        } else {
          var cachedData = cache === 'force' ? null : this.cacheService.getCacheData(url, params);

          if (cachedData !== null) {
            cachedData = this.cacheHandler(cachedData);
          }

          if (cachedData === null) {
            this.logger.log('GET request: ' + url, null);

            // Update cache entry
            return this.createRequest(promiseBuilder, options).then(function(response: any) {
              self.cacheService.setCacheData(url, params, response, null);
              return angular.copy(response);
            });
          } else {
            // Use cached version
            var deferred = this.$q.defer();
            deferred.resolve(angular.copy(cachedData));

            return this.errorHandler(deferred.promise, options);
          }
        }
      }

      /**
       * Executes a PUT request.
       * @param {!String} url URL of the REST service call.
       * @param {String|Object} data Data to be sent as the request message data.
       * @param {?Object=} options Additional options for request/error handlers.
       * @return {Object} The promise.
       */
      put(url: string, data: any, options: any): any {
        var self = this;
        this.logger.log('PUT request: ' + url, null);
        var promise = function() {
          return self.$http.put(self.baseUri + url, data, self.defaultConfig);
        };
        return this.createRequest(promise, options);
      }

      /**
       * Executes a POST request.
       * @param {!String} url URL of the REST service call.
       * @param {String|Object} data Data to be sent as the request message data.
       * @param {?Object=} options Additional options for request/error handlers.
       * @return {Object} The promise.
       */
      post(url: string, data: any, options: any): any {
        this.logger.log('POST request: ' + url, null);
        var self = this;
        var promiseBuilder = function() {
          return self.$http.post(self.baseUri + url, data, self.defaultConfig);
        };

        return this.createRequest(promiseBuilder, options);
      }

      /**
       * Executes a DELETE request.
       * @param {!String} url URL of the REST service call.
       * @param {?Object=} options Additional options for request/error handlers.
       * @return {Object} The promise.
       */
      delete(url: string, options: any): any {
        this.logger.log('DELETE request: ' + url, null);
        var self = this;
        var promise = function() {
          return self.$http.delete(self.baseUri + url, self.defaultConfig);
        };
        return this.createRequest(promise, options);
      }

      /**
       * Sets the current server configuration.
       * A server parameter must contains at least these two strings:
       * - restServerUrl: The base URL of the server
       * - restUri: The REST URI access point
       * @param {!Object} server The server configuration.
       */
      setServer(server: any) {
        this.baseServer = server;
        this.baseUri = server.restServerUrl + server.restUri;
      }

      /**
       * Returns the current server configuration.
       * @return {String} The server base URL.
       */
      getServer() {
        return this.baseServer;
      }

      /**
       * Returns the base URI.
       * @return {String} The computed base URI.
       */
      getBaseUri() {
        return this.baseUri;
      }

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
      setRequestHandler(requestHandlerFunc: any) {
        this.requestHandler = requestHandlerFunc;
      }

      /**
       * Gets the current request handler function.
       * @return {function} The request handler.
       */
      getRequestHandler() {
        return this.requestHandler;
      }

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
      setErrorHandler(errorHandlerFunc: any) {
        this.errorHandler = errorHandlerFunc;
      }

      /**
       * Gets the current error handler function.
       * @return {function} The error handler.
       */
      getErrorHandler() {
        return this.errorHandler;
      }

      /**
       * Sets a customized default cache handler function for all cached requests.
       * The function should have the following signature, and return an object:
       * function cacheHandler(cachedData) {
       *    return isValid(cachedData) ? cachedData : null;
       * }
       * This handler is only called before for requests that would return cached data otherwise.
       * @param {!function} cacheHandlerFunc The cache handler.
       */
      setCacheHandler(cacheHandlerFunc: any) {
        this.cacheHandler = cacheHandlerFunc;
      }

      /**
       * Gets the current cache handler function.
       * @return {function} The cache handler.
       */
      getCacheHandler() {
        return this.cacheHandler;
      }

      /**
       * Default request handler, that just builds the promise.
       * @param {!function} requestBuilder A function that return the request's promise.
       * @return {Object} The promise.
       * @type {function}
       */
      private requestHandler(requestBuilder: any, options: any) {
        // Default request handler just builds the request
        return requestBuilder(options);
      }

      /**
       * Default error handler.
       * This handler tries to extract a description of the error and logs and error with it.
       * @param {!Object} promise The promise to handle errors.
       * @param {?Object=} options Additional options: if 'skipErrors' property is set to true, errors will not be handled.
       * @type {function}
       */
      private errorHandler(promise: any, options: any) {
        var self = this;
        if (!options || !options.skipErrors) {
          promise.catch(function(response: any) {
            var error;

            if (response.status === 404) {
              error = 'Server unavailable or URL does not exist';
            } else if (response.data) {
              var message = response.data.message ? response.data.message : null;
              var code = response.data.error ? response.data.error : null;
              error = message || code || angular.toJson(response.data);
            }

            if (error) {
              self.logger.error(error, null);
            }

            return self.$q.reject(response);
          });
        }
        return promise;
      }

      /**
       * Creates the request.
       * @param {!function} requestBuilder A function that return the request's promise.
       * @param {?Object=} options Additional options for request/error handlers.
       * @return {Object} The promise.
       */
      private createRequest(requestBuilder: any, options: any) {
        return this.errorHandler(this.requestHandler(requestBuilder, options), options);
      }
  }

  angular
    .module('helpers')
    .service('restService', RestService);

}

