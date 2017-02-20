'use strict';

// Translations are injected at build phase
angular.module('translations', []);

export default angular.module('app', [
  'translations',
  'gettext',
  'ngAnimate',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
]);
