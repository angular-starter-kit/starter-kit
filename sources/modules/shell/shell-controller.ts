module shell {
  'use strict';

  export class ShellController {
    public logger: any;

    /* @ngInject */
    constructor ($rootScope: ng.IRootScopeService, $scope: ng.IScope, $stateParams: ng.ui.IStateParamsService, logger: any) {
      this.logger = logger.getLogger('shell');
      console.log(this.logger);
      this.logger.info('begin');
    }
  }
}
