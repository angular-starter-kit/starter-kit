'use strict';

/**
 * Tests for loading directive.
 */
describe('loading directive', function () {
  var element;

  beforeEach(function () {
    module('loadingDirective');
    module('htmlTemplates');
  });

  it('should be visible only when loading is in progress', inject(function ($httpBackend, $rootScope, $compile) {
    $rootScope.hasLoaded = false;
    element = $('<div se-loading="hasLoaded"></div>');
    element = $compile(element)($rootScope);
    $rootScope.$digest();

    expect(element).not.toHaveClass('ng-hide');

    $rootScope.hasLoaded = true;
    $rootScope.$digest();
    expect(element).toBeHidden();
  }));

});