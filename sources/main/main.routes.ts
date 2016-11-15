import app from 'main.module';

/**
 * Configures the application routes.
 */
function routeConfig($stateProvider: angular.ui.IStateProvider,
                     $urlRouterProvider: angular.ui.IUrlRouterProvider,
                     gettext: angular.gettext.gettextFunction) {

  // Routes configuration
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      template: <string>require('shell/shell.html'),
      controller: 'shellController as shell'
    })
    .state('app.home', {
      url: '/',
      views: {
        'menuContent': {
          template: <string>require('screens/home/home.html'),
          controller: 'homeController as vm'
        }
      },
      data: {title: gettext('Home')}
    })
    .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          template: <string>require('screens/about/about.html'),
          controller: 'aboutController as vm'
        }
      },
      data: {title: gettext('About')}
    });

}

app.config(routeConfig);
