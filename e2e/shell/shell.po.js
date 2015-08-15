/*
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var Shell = function() {
  this.navbar = element(by.css('.navbar'));
  this.navbarItems = this.navbar.element(by.css('.navbar-nav')).all(by.css('li'));
  this.languageDropdown = this.navbar.element(by.css('.dropdown'));
  this.languageDropdownItems = this.languageDropdown.all(by.css('li'));
};

module.exports = new Shell();
