module homepage {
  'use strict';

  export class HomeController {
    public logger: any;

    /* @ngInject */
    constructor ($rootScope: ng.IRootScopeService, $scope: ng.IScope, $stateParams: ng.ui.IStateParamsService, logger: any) {
      this.logger = logger.getLogger('homepage');
      this.logger.info('homepage begin');
    }
  }
}
