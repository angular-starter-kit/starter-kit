'use strict';

/** @ngInject */
function acmeNavbar(): ng.IDirective {
  'use strict';

  return {
    restrict: 'E',
    scope: {
      creationDate: '='
    },
    templateUrl: 'modules/ui-components/navbar/navbar.html',
    controller: NavbarController,
    controllerAs: 'vm',
    bindToController: true
  };

}

/** @ngInject */
class NavbarController {
'use strict';
  constructor() {
    console.log('otot');
  }
}

angular
  .module('navbar', ['ui.router'])
  .directive('acmeNavbar', acmeNavbar);

