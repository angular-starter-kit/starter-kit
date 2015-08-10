'use strict';

/**
 * home controller.
 */

class HomeController {
	public logger: any;

	/* @ngInject */
	constructor ($rootScope: ng.IRootScopeService, $scope: ng.IScope, $stateParams: ng.ui.IStateParamsService, logger: any) {
		this.logger = logger.getLogger('homepage');
	}
}

angular
	.module('homepage', ['ui.router', 'logger'])
	.controller('HomeController', HomeController);
