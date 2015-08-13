'use strict';

/**
 * shell controller.
 */

angular
	.module('shell', ['ui.router', 'logger'])

	.controller('shellController', function(logger) {

      	logger = logger.getLogger('shell');
      	logger.info('begin');

	});
