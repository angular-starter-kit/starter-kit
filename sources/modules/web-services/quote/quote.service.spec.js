'use strict';

/*
 * Tests for quote service.
 */
describe('quoteService', function() {

  var $q;
  var restService;
  var quoteService;

  beforeEach(function() {
    module('webServices');

    inject(function(_$q_,
                    _quoteService_,
                    _restService_) {

      $q = _$q_;
      quoteService = _quoteService_;
      restService = _restService_;
    });

    spyOn(restService, 'get').and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve({});
      return deferred.promise;
    });
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
