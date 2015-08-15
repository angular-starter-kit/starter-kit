'use strict';

/*
 * Tests for quote service.
 */
describe('quoteService', function() {

  var restService;
  var quoteService;

  beforeEach(function() {
    module('webServices');

    inject(function(_quoteService_,
                    _restService_) {

      quoteService = _quoteService_;
      restService = _restService_;
    });

    spyOn(restService, 'get');
  });

  it('should have a getRandomJoke method', function() {
    expect(typeof (quoteService.getRandomJoke)).toBe('function');
  });

  describe('getRandomJoke', function() {

    it('should call rest service get method', function() {
      // Act
      quoteService.getRandomJoke();

      // Assert
      expect(restService.get).toHaveBeenCalled();
    });

  });

});
