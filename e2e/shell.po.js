/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var Shell = function() {
  this.navbarE1 = element(by.css('.navbar'));
  this.navbarNavs = this.navbarE1.element(by.css('.navbar-nav')).all(by.css('li'));
  this.navbarTexttE1 = this.navbarE1.element(by.css('.navbar-text'));
  this.langComboBoxE1 = this.navbarTexttE1.element(by.css('select'));
  this.langOptions = this.langComboBoxE1.all(by.css('option'));
};

module.exports = new Shell();
