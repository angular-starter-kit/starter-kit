'use strict';

describe('The shell', function () {
  var page;

  beforeEach(function () {
    browser.get('/');
    page = require('./shell.po');
  });

  it('navbar should contain 2 links', function() {
    expect(page.navbarNavs.count()).toBe(2);
  });

  it('combobox should contain 2 supported languages', function() {
    expect(page.langOptions.count()).toBe(2);
  });

});