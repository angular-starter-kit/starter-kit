(function() {

  'use strict';

  angular
    .module('app')
    .config(routeConfig);

  /**
   * Configures the application routes.
   */
  function routeConfig($stateProvider,
                       $urlRouterProvider,
                       gettext) {

    // Routes configuration
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('app', {
        templateUrl: 'modules/shell/shell.html',
        controller: 'shellController as vm'
      })
      .state('app.home', {
        url: '/',
        templateUrl: 'modules/screens/home/home.html',
        controller: 'homeController as vm',
        data: {title: gettext('T_HOME')}
      })
      .state('app.about', {
        url: '/about',
        templateUrl: 'modules/screens/about/about.html',
        controller: 'aboutController as vm',
        data: {title: gettext('T_ABOUT')}
      });

  }

})();

