'use strict';

/**
 * @ngdoc controller
 * @name shellController
 * @requires $scope
 * @description
 *  Controller supporting shared data.
 * @property {String} currentLanguage current language.
 * @property {Hash} languages collection of supported languages.
 */

angular
  .module('shell')
  .controller('shellController', function($locale,
                                          $scope,
                                          config,
                                          gettextCatalog) {

    $scope.currentLanguage = $locale.id;
    $scope.languages = config.supportedLanguages;

    /*
     * Watches
     */

    $scope.$watch('currentLanguage', function() {
      gettextCatalog.setCurrentLanguage($scope.currentLanguage);
    });

  });
