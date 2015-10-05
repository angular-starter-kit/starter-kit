(function() {

  'use strict';

  angular
    .module('app')
    .factory('logger', logger);

  /**
   * Provides a simple logging system with the possibility of registering log observers.
   * In order to track the source module of message logs, a customized logger should be instanciated using the
   * getLogger() method just after its injection.
   *
   * 4 different log levels are provided, via corresponding methods:
   * - log: for debug information
   * - info: for informative status of the application (success, ...)
   * - warning: for non-critical errors that do not prevent normal application behavior
   * - error: for critical errors that prevent normal application behavior
   *
   * Example usage:
   * angular.module('myService', ['helpers']).factory('myService', function (logger) {
   *   logger = logger.getLogger('myService');
   *   ...
   *   logger.log('something happened');
   * }
   *
   * If you want to disable debug logs in production, add this snippet to your app configuration:
   * angular.module('main').config(function ($provide) {
   *   // Disable debug logs in production version
   *   $provide.decorator('$log', ['$delegate', function($delegate) {
   *     if (!debug) {
   *       $delegate.log = function() {};
   *     }
   *     return $delegate;
   *   }]);
   * });
   *
   * If you want additional tasks to be performed on log entry (show toast, for example), you can register observers
   * using the addObserver() method.
   */
  function logger($log) {

    /*
     * Public interface
     */

    var service = {};

    /**
     * Gets a customized logger based on the given module name.
     * @param {string} moduleName The module name.
     * @return {Logger} A logger object.
     */
    service.getLogger = function(moduleName) {
      return new Logger(moduleName);
    };

    /**
     * Adds a new observer function that will be called for each new log entry.
     * These parameters are passed to the observer function, in order:
     * - message {string} message The message to be logged.
     * - source {?string=} source The source of the log.
     * - level {'log'|'info'|'warning'|'error'} level The log level.
     * - options {Object?} options Additional log options.
     * @param {!function} observerFunc The observer function.
     */
    service.addObserver = function(observerFunc) {
      observers.push(observerFunc);
    };

    /*
     * Internal
     */

    var observers = [];

    /**
     * Logs a message from the specified source.
     * @param {string} message The message to be logged.
     * @param {?string=} source The source of the log.
     * @param {function} logFunc The base log function to use.
     * @param {'log'|'info'|'warning'|'error'} level The log level.
     * @param {Object?} options Additional log options.
     */
    function log(message, source, logFunc, level, options) {
      logFunc(source ? '[' + source + ']' : '', message, '');

      angular.forEach(observers, function(observerFunc) {
        observerFunc(message, source, level, options);
      });
    }

    /**
     * Customized logger object based on the given module name.
     * @param {string} moduleName The module name.
     * @constructor
     */
    function Logger(moduleName) {
      this.moduleName = moduleName;
    }

    /**
     * Logs a message with the default log level.
     * @param {string} message The message to be logged.
     * @param {Object?} options Additional log options.
     */
    Logger.prototype.log = function(message, options) {
      log(message, this.moduleName, $log.log, 'log', options);
    };

    /**
     * Logs a message with the info level.
     * @param {string} message The message to be logged.
     * @param {Object?} options Additional log options.
     */
    Logger.prototype.info = function(message, options) {
      log(message, this.moduleName, $log.info, 'info', options);
    };

    /**
     * Logs a message with the warning level.
     * @param {string} message The message to be logged.
     * @param {Object?} options Additional log options.
     */
    Logger.prototype.warning = function(message, options) {
      log(message, this.moduleName, $log.warn, 'warning', options);
    };

    /**
     * Logs a message with the error level.
     * @param {string} message The message to be logged.
     * @param {Object?} options Additional log options.
     */
    Logger.prototype.error = function(message, options) {
      log(message, this.moduleName, $log.error, 'error', options);
    };

    return service;

  }

})();
