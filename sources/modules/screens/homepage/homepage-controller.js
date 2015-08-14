'use strict';

angular
  .module('homepage')
  .controller('homeController', function($scope,
                                         logger,
                                         quoteService) {

    logger = logger.getLogger('homepage');

    $scope.isLoading = true;
    $scope.quote = null;

    /**
     * Init controller.
     */
    (function() {
      quoteService
        .getQuoteOfTheDay()
        .then(function(quote) {
          $scope.quote = quote;
          $scope.isLoading = false;
          logger.log('quote of day loaded');
        });
    })();

  });
