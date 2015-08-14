'use strict';

describe('The home view', function () {
  var page;

  beforeEach(function () {
    browser.get('/');
    page = require('./main.po');
  });

  it('should include jumbotron with correct data', function() {
    expect(page.h1El.getText()).toMatch('Hello');
    expect(page.imgEl.getAttribute('src')).toMatch('angularjs');
  });
});