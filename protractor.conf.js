'use strict';

var conf = require('./gulpfile.config');
var HtmlReporter = require('protractor-html-screenshot-reporter');

// An example configuration file.
exports.config = {
  // The address of a running selenium server.
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  //seleniumServerJar: deprecated, this should be set on node_modules/protractor/config.json

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:3000',

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: [conf.paths.e2e + '/**/*.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose: true, // log tests in console
    realtimeFailure: true,
    includeStackTrace: true
  },

  onPrepare: function() {
    // reporter in html with a screenshot for each test.
    jasmine.getEnv().addReporter(new HtmlReporter({
       baseDirectory: 'reports/e2e/html'
    }));
  }
};
