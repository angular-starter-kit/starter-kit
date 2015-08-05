'use strict';

/**
 * Home controller.
 */
angular.module('homepage', ['ui.router'])
  .controller('homepageController', function ($rootScope, $scope, $stateParams, logger) {
    logger = logger.getLogger('homepage');
  });
