// ==========================================================================
// GULP TASKS CONFIGURATION
// ==========================================================================
// This file contains the variables used in other gulp files which defines
// tasks.
// ==========================================================================

'use strict';

var gutil = require('gulp-util');
var fs = require('fs');
var bower = JSON.parse(fs.readFileSync('.bowerrc', "utf8"));

/**
 *  The main paths of your project, handle these with care.
 */
exports.paths = {
  src: 'sources',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e',
  main: 'main',
  bower: bower.directory
};

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
  exclude: [/bootstrap.js$/, /bootstrap\.css/],
  directory: bower.directory
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
