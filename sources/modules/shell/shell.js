'use strict';

/**
 * shell controller.
 */

angular
	.module('shell', ['ui.router', 'logger', 'loading'])

	.controller('shellController', function(logger, $scope, $timeout, config, $locale, gettextCatalog) {

      	logger = logger.getLogger('shell');
      	logger.info('begin');
      	$scope.currentLanguage = $locale.id;
      	$scope.languages = config.supportedLanguages;
      	$scope.$watch('currentLanguage', function(){
      		gettextCatalog.setCurrentLanguage($scope.currentLanguage);
      	});
      	$scope.isLoading = true;
      	$scope.message = 'wait';
      	$timeout(function(){
      		$scope.isLoading = false;
      	}, 1000);
	});
