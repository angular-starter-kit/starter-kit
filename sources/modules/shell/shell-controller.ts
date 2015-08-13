module shell {
  'use strict';

  export class ShellController {

    public logger: any;
    private $location: any;

    /* @ngInject */
    constructor ($rootScope: ng.IRootScopeService, $scope: ng.IScope, $stateParams: ng.ui.IStateParamsService, logger: any, $location: any) {
      this.$location = $location;

      this.logger = logger.getLogger('shell');
      this.logger.info('begin');
    }

  }

}
