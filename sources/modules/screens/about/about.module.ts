/**
 * about controller.
 */

module about {
  'use strict ';

   angular
    .module('about', ['ui.router', 'logger'])
    .controller('aboutController', AboutController);

}