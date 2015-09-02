/// <reference path="../../.tmp/typings/tsd.d.ts" />

module main {

  'use strict';

  // Only declare here global modules needed for the application to start.
  // These modules should be kept to minimum.
  angular.module('main', [
    // Dependencies
    'gettext',
    'ngAnimate',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',

    // Screens
    'home',
    'about',
    'shell',

    // Modules needed for root controller
    'helpers'
  ]);

};
