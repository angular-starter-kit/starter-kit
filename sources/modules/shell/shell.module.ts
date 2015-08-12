/**
 * shell controller.
 */

module shell {
  'use strict';

   angular
    .module('shell', ['ui.router', 'logger', 'navbar'])
    .controller('ShellController', ShellController);

}
