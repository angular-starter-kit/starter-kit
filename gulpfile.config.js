/*
 * GULP TASKS CONFIGURATION
 * This file contains the variables used in gulp tasks.
 */

'use strict';

var gutil = require('gulp-util');
var fs = require('fs');
var bower = JSON.parse(fs.readFileSync('.bowerrc', 'utf8'));

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
 * Backend proxy configuration.
 * With the given example, HTTP request to like $http.get('/api/stuff') will be automatically proxified
 * to the specified server.
 *
 * For more details and option, see https://github.com/chimurai/http-proxy-middleware/
 */
exports.backendProxy = {
  context: '/api',
  options: {
    pathRewrite: { '^/api' : '' },
    target: 'http://api.icndb.com',
    changeOrigin: true
  }
};

/**
 *  Wiredep is the lib which inject bower dependencies in your project.
 *  Mainly used to inject script tags in the index.html but also used to inject css preprocessor
 *  deps and js files in karma.
 */
exports.wiredep = {
  exclude: [],
  directory: bower.directory
};

/**
 *  Common implementation for an error handler of a gulp plugin.
 */
exports.errorHandler = function(title) {
  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
