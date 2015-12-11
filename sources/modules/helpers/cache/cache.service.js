(function() {

  'use strict';

  angular
    .module('app')
    .factory('cacheService', cacheService);

  /**
   * Cache service: manages cached data for GET requests.
   * By default, the cache is only persisted in memory, but you can change this behavior using the setPersistence()
   * method.
   */
  function cacheService($window,
                        logger) {

    logger = logger.getLogger('cacheService');

    /*
     * Public interface
     */

    var service = {};

    /**
     * Sets the cache data for the specified request.
     * @param {!string} url URL of the REST service call.
     * @param {?map=} params Map of strings or objects which will be turned to ?key1=value1&key2=value2 after the url.
     *   If the value is not a string, it will be JSONified.
     * @param {Object} data The received data.
     * @param {Date=} date The cache date, now date is used if not specified.
     */
    service.setCacheData = function(url, params, data, date) {
      var cacheKey = getCacheKey(url, params);

      cachedData[cacheKey] = {
        date: date || new Date(),
        data: data
      };

      logger.log('Cache set for key: "' + cacheKey + '"');

      saveCacheData();
    };

    /**
     * Gets the cached data (if possible) for the specified request.
     * @param {!string} url URL of the REST service call.
     * @param {?map=} params Map of strings or objects which will be turned to ?key1=value1&key2=value2 after the url.
     *   If the value is not a string, it will be JSONified.
     * @return {?Object} The cached data or null if no cached data exists for this request.
     */
    service.getCacheData = function(url, params) {
      var cacheKey = getCacheKey(url, params);
      var cacheEntry = cachedData[cacheKey];

      if (cacheEntry) {
        logger.log('Cache hit for key: "' + cacheKey + '"');
        return cacheEntry.data;
      }

      return null;
    };

    /**
     * Gets the cached data date (if possible) for the specified request.
     * @param {!string} url URL of the REST service call.
     * @param {?map=} params Map of strings or objects which will be turned to ?key1=value1&key2=value2 after the url.
     *   If the value is not a string, it will be JSONified.
     * @return {?Object} The cached data date or null if no cached data exists for this request.
     */
    service.getCacheDate = function(url, params) {
      var cacheKey = getCacheKey(url, params);
      var cacheEntry = cachedData[cacheKey];
      return cacheEntry ? cacheEntry.date : null;
    };

    /**
     * Clears the cached data (if exists) for the specified request.
     * @param {!string} url URL of the REST service call.
     * @param {?map=} params Map of strings or objects which will be turned to ?key1=value1&key2=value2 after the url.
     *   If the value is not a string, it will be JSONified.
     */
    service.clearCacheData = function(url, params) {
      var cacheKey = getCacheKey(url, params);
      cachedData[cacheKey] = undefined;
      logger.log('Cache cleared for key: "' + cacheKey + '"');
      saveCacheData();
    };

    /**
     * Cleans cache entries older than the specified date.
     * @param {date=} expirationDate The cache expiration date. If no date is specified, all cache is cleared.
     */
    service.cleanCache = function(expirationDate) {
      if (expirationDate) {
        angular.forEach(cachedData, function(value, key) {
          if (expirationDate >= value.date) {
            cachedData[key] = undefined;
          }
        });
      } else {
        cachedData = {};
      }
      saveCacheData();
    };

    /**
     * Sets the cache persistence.
     * Note that changing the cache persistence will also clear the cache from its previous storage.
     * @param {'local'|'session'=} persistence How the cache should be persisted, it can be either
     *   in the local or session storage, or if no parameters is provided it will be only in-memory (default).
     */
    service.setPersistence = function(persistence) {
      service.cleanCache();
      storage = persistence === 'local' || persistence === 'session' ? $window[persistence + 'Storage'] : null;

      loadCacheData();
    };

    /*
     * Internal
     */

    var cachedData = {};
    var storage = null;

    /**
     * Gets the cache key for the specified url and parameters.
     * @param {!string} url The request URL.
     * @param {?map=} params Map of strings or objects which will be turned to ?key1=value1&key2=value2 after the url.
     *   If the value is not a string, it will be JSONified.
     * @return {string} The corresponding cache key.
     */
    function getCacheKey(url, params) {
      return url + (params ? angular.toJson(params) : '');
    }

    /**
     * Saves the current cached data into persisted storage.
     */
    function saveCacheData() {
      if (storage) {
        storage.cachedData = angular.toJson(cachedData);
      }
    }

    /**
     * Loads cached data from persisted storage.
     */
    function loadCacheData() {
      var data = storage ? storage.cachedData : null;
      cachedData = data ? angular.fromJson(data) : {};
    }

    /*
     * Initializes service.
     */

    loadCacheData();

    return service;
  }

})();
