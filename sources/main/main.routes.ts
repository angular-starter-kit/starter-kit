module app {

  'use strict';

  /**
   * Configures the application routes.
   */
  function routeConfig($stateProvider: angular.ui.IStateProvider,
                       $urlRouterProvider: angular.ui.IUrlRouterProvider,
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

  angular
    .module('app')
    .config(routeConfig);

}

