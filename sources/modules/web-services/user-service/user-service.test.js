'use strict';

/**
 * Tests for user service.
 */
/**
describe('userService', function() {
  var restService, userService;

  beforeEach(function() {
    module('userService');

    inject(function(_userService_, _restService_) {
      userService = _userService_;
      restService = _restService_;
    });

    spyOn(restService, 'post');
  });

  it('should have a login method', function() {
    expect(typeof (userService.login)).toBe('function');
  });

  it('should have a logout method', function() {
    expect(typeof (userService.login)).toBe('function');
  });

  it('should have a registerForPushNotifications method', function() {
    expect(typeof (userService.registerForPushNotifications)).toBe('function');
  });

  describe('login', function() {

    it('should call rest service post method', function () {
      // Act
      userService.login('user', 'pass', 'id', 'token', 'android');

      // Assert
      expect(restService.post).toHaveBeenCalledWith('/user/login', angular.toJson({
        username: 'user',
        password: 'pass'
      }));
    });

  });

  describe('logout', function() {

    it('should call rest service post method', function () {

      var deviceId = '123-abc';

      // Act
      userService.logout(deviceId);

      // Assert
      expect(restService.post).toHaveBeenCalledWith('/user/logout', angular.toJson({
        deviceId: deviceId
      }));
    });

  });

  describe('registerForPushNotifications', function() {

    it('should call rest service post method', function () {
      // Act
      userService.registerForPushNotifications('id', 'token', 'android');

      // Assert
      expect(restService.post).toHaveBeenCalledWith('/user/registerpush', angular.toJson({
        deviceId: 'id',
        notificationToken: 'token',
        operatingSystem: 'android'
      }));
    });

  });

});
**/
