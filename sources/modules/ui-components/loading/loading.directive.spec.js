'use strict';

/*
 * Tests for loading directive.
 */
describe('loading directive', function() {

  var element;

  beforeEach(function() {
    module('main');
    module('uiComponents');
  });

  it('should be visible only when loading is in progress', inject(function($rootScope,
                                                                           $compile) {

    $rootScope.isLoading = true;
    element = $('<div ui-loading="isLoading"></div>');
    element = $compile(element)($rootScope);
    $rootScope.$digest();

    expect(element).not.toHaveClass('ng-hide');

    $rootScope.isLoading = false;
    $rootScope.$digest();

    expect(element).toHaveClass('ng-hide');
  }));

});
