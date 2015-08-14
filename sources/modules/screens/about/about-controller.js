'use strict';

angular
  .module('about')
  .controller('aboutController', function($scope,
                                          config) {

    $scope.version = config.version;
  });
