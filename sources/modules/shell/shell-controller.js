'use strict';

angular
	.module('shell')
	.controller('shellController', function(logger, 
											$scope,
											$timeout,
											config,
											$locale,
											gettextCatalog) {

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
	      	logger.info('begin');
			 
			$timeout(function(){
				$scope.isLoading = false;
			}, 1000);
		 })();
	});
