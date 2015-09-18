module home {

  'use strict';

  angular
    .module('home', [
      'helpers',
      'webServices',
      'uiComponents'
    ])
    .controller(home.HomeController);

}
