// ==========================================================================
// GULP TASKS CONFIGURATION
// ==========================================================================
// This file contains the variables used in other gulp files which defines
// tasks.
// ==========================================================================

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
 * You can add a proxy to your backend by uncommenting the line bellow.
 * You just have to configure a context which will we redirected and the target url.
 * Example: $http.get('/api') requests will be automatically proxified.
 *
 * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.0.5/README.md
 */

/**
exports.proxy = {
  context: '/api',
  options: {
     target: 'http://jsonplaceholder.typicode.com'
  }
};**/

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
  exclude: [],
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
