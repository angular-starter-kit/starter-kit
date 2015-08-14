'use strict';

/**
 * Tests for quote service.
 */
describe('quoteService', function() {
  var restService, quoteService;

  beforeEach(function() {
    module('quoteService');

    inject(function(_quoteService_, 
                   _restService_) {
                     
      quoteService = _quoteService_;
      restService = _restService_;
    });

    spyOn(restService, 'get');
  });

  it('should have a getQuoteOfTheDay method', function() {
    expect(typeof (quoteService.getQuoteOfTheDay)).toBe('function');
  });

  describe('getQuoteOfTheDay', function() {

    it('should call rest service get method', function () {
      // Act
      quoteService.getQuoteOfTheDay();

      // Assert
      expect(restService.get).toHaveBeenCalledWith('http://api.theysaidso.com/qod.json');
    });

  });

});
