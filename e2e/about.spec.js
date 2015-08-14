'use strict';

describe('The about view', function () {
  var page;

  beforeEach(function () {
    browser.get('/#/about');
    page = require('./main.po');
  });

  it('should contain version', function() {
    expect(page.jumbEl.getText()).toMatch('Version');
  });

});