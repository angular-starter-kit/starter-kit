'use strict';

angular
  .module('about')
  .controller('aboutController', function($scope, logger, config) {

    logger = logger.getLogger('about');
    logger.info('about');
    $scope.version = config.version;

  });
