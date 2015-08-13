'use strict';

angular
  .module('about')
  .controller('aboutController', function($scope, logger) {

    logger = logger.getLogger('about');
    logger.info('about');

  });
