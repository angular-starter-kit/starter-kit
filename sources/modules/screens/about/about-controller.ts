module about {
  'use strict';

  export class AboutController {
    public logger: any;

    /* @ngInject */
    constructor ($rootScope: ng.IRootScopeService, $scope: ng.IScope, $stateParams: ng.ui.IStateParamsService, logger: any) {
      this.logger = logger.getLogger('about');
      console.log(this.logger);
      this.logger.info('begin about controller');
    }
  }
}
