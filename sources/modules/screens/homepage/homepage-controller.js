'use strict';

angular
	.module('homepage')
	.controller('homeController', function($scope, logger) {

		logger = logger.getLogger('homepage');
		logger.info('homepage');

	});
