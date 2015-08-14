'use strict';

/**
 * Cache service: manages cached data for GET requests.
 */
angular
  .module('cacheService', [
    'logger',
  ])
  .factory('cacheService', function($window,
                                    logger) {

    logger = logger.getLogger('cacheService');

    /*
     * Service public interface
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
     * Initializes service.
     */
    (function() {
      loadCacheData();
    }());

    /*
     * Service internals
     */

    var cachedData = {};

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
      $window.localStorage.cachedData = angular.toJson(cachedData);
    }

    /**
     * Loads cached data from persisted storage.
     */
    function loadCacheData() {
      var data = $window.localStorage.cachedData;
      cachedData = data ? angular.fromJson(data) : {};
    }

    return service;
  });
