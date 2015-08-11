'use strict';

/**
 * Provides a simple logging system with the possibility of registering log observers.
 * In order to track the source module of message logs,
 * a customized logger should be instanciated using the getLogger() method just after its injection.
 *
 * 4 different log levels are provided, via corresponding methods:
 * - log: for debug information
 * - info: for informative status of the application (success, ...)
 * - warning: for non-critical errors that do not prevent normal application behavior
 * - error: for critical errors that prevent normal application behavior
 *
 * Example usage:
 * angular.module('myService', ['logger']).factory('myService', function (logger) {
 *   logger = logger.getLogger('myService');
 *   ...
 *   logger.log('something happened');
 * }
 *
 * If you want to disable debug logs in production, add this snippet to your app configuration:
 * angular.module('app').config(function ($provide) {
 *   // Disable debug logs in production version
 *   $provide.decorator('$log', ['$delegate', function($delegate) {
 *     if (!debug) {
 *       $delegate.log = function() {};
 *     }
 *     return $delegate;
 *   }]);
 * });
 *
 * If you want additional tasks to be performed on log entry (show toast, for example),
 * you can register observers using the addObserver() method.
 */

module logger {
    'use strict';

    let observers = [];

    /**
     * Logs a message from the specified source.
     * @param {string} message The message to be logged.
     * @param {?string=} source The source of the log.
     * @param {function} logFunc The base log function to use.
     * @param {'log'|'info'|'warning'|'error'} level The log level.
     * @param {Object?} options Additional log options.
     */
    function log(message: string, source: string, logFunc: any, level: string, options: any): void {
        logFunc(source ? '[' + source + ']' : '', message, '');
        angular.forEach(observers, function(observerFunc: any) {
            observerFunc(message, source, level, options);
        });
    };

    /*
     * ILogger interface
     */
    interface ILogger {
        /**
         * Logs a message with the log level.
         * @param {string} message The message to be logged.
         * @param {Object?} options Additional log options.
         */
        log(message: string, options: any): void;

        /**
         * Logs a message with the info level.
         * @param {string} message The message to be logged.
         * @param {Object?} options Additional log options.
         */

        info(message: string, options: any): void;

        /**
         * Logs a message with the warning level.
         * @param {string} message The message to be logged.
         * @param {Object?} options Additional log options.
         */
        warning(message: string, options: any): void;

        /**
         * Logs a message with the error level.
         * @param {string} message The message to be logged.
         * @param {Object?} options Additional log options.
         */
        error(message: string, options: any): void;
    }

    /*
     * Logger class
     */
    export class Logger implements ILogger {

        private moduleName: string;
        private logFunc: any;
        private $log: ng.ILogService;

        constructor(moduleName: string, logFunc: any, $log: ng.ILogService) {
            this.moduleName = moduleName;
            this.logFunc = logFunc;
            this.$log = $log;
        }
        log(message: string, options: any) {
            this.logFunc(message, this.moduleName, this.$log.log, 'log', options);
        }
        info(message: string, options: any) {
            this.logFunc(message, this.moduleName, this.$log.info, 'info', options);
        }
        warning(message: string, options: any) {
            this.logFunc(message, this.moduleName, this.$log.warn, 'warning', options);
        }
        error(message: string, options: any) {
            this.logFunc(message, this.moduleName, this.$log.error, 'error', options);
        }
    }

    /*
     * Logger service
     */
    export class LoggerService {

        private $log: ng.ILogService;

        constructor($log: ng.ILogService) {
            this.$log = $log;
        }

        /**
         * Gets a customized logger based on the given module name.
         * @param {string} moduleName The module name.
         * @return {Logger} A logger object.
         */
        getLogger(moduleName: string) {
            return new Logger(moduleName, log, this.$log);
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
        addObserver(observerFunc: any) {
            observers.push(observerFunc);
        };
    }

    /**
     * declare logger angular module
     */
    angular.module('logger', [])
        .service('logger', LoggerService);
}
