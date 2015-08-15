/*
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var Home = function() {
  this.jumbotron = element(by.css('.jumbotron'));
  this.title = this.jumbotron.element(by.css('h1'));
  this.image = this.jumbotron.element(by.css('img'));
};

module.exports = new Home();
