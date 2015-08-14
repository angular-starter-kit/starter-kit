'use strict';

/**
 * @ngdoc controller
 * @name shellController
 * @requires $scope
 * @description
 *  Controller supporting shared data.
 * @property {String} currentLanguage current language.
 * @property {Hash} languages collection of supported languages.
 * @property {Boolean} isLoading used in `uiLoading` directive.
 * @property {String} message  used in `uiLoading` directive.
 */

angular
  .module('shell')
  .controller('shellController', function($locale,
                                          $scope,
                                          config,
                                          logger,
                                          gettextCatalog,
                                          quoteService) {

    logger = logger.getLogger('shell');
  
    $scope.currentLanguage = $locale.id;
    $scope.languages = config.supportedLanguages;
    $scope.isLoading = true;
    $scope.message = 'wait';

  /*
   * Watches
   */
  $scope.$watch('currentLanguage', function() {
    gettextCatalog.setCurrentLanguage($scope.currentLanguage);
  });

  /**
   * Init controller.
   */
  (function() {
	quoteService
	  .getQuoteOfTheDay()
	  .then(function(data) {
		 
		 
	    logger.info('quote of day received');	  
	  });
  })();
});
