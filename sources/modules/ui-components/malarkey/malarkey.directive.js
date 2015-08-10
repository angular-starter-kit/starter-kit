'use strict';

/** @ngInject */
function MalarkeyController() {
  var vm = this;

  vm.contributors = [];
}

/** @ngInject */
function acmeMalarkey(malarkey) {

  function linkFunc(scope, el) {
    var watcher;
    var typist = malarkey(el[0], {
      typeSpeed: 40,
      deleteSpeed: 40,
      pauseDelay: 800,
      loop: true,
      postfix: ' '
    });

    el.addClass('acme-malarkey');

    angular.forEach(scope.extraValues, function(value) {
      typist.type(value).pause().delete();
    });

    scope.$on('$destroy', function () {
      watcher();
    });
  }

  var directive = {
    restrict: 'E',
    scope: {
      extraValues: '=',
    },
    template: '&nbsp;',
    link: linkFunc,
    controller: MalarkeyController,
    controllerAs: 'vm'
  };

  return directive;
}

angular
  .module('app')
  .directive('acmeMalarkey', acmeMalarkey);
