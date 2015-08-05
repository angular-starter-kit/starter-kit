'use strict';

/**
 * About controller.
 */
angular.module('about', ['ui.router'])
  .controller('aboutController', function ($rootScope, $scope, $stateParams, logger) {
    logger = logger.getLogger('about');
  });
