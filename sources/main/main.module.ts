/// <reference path="../../typings/tsd.d.ts" />

'use strict';

angular.module('app', [
  'translations',
  'gettext',
  'ngAnimate',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
]);

// Translations are injected at build phase
angular.module('translations', []);
