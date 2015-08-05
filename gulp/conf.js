'use strict';

/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {

  // -----------------------------------------------------
  // Global
  // -----------------------------------------------------

  src: 'sources',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e',
  bower: 'sources/librairies',

  // -----------------------------------------------------
  // Translations
  // -----------------------------------------------------

  translations: 'translations', // translations folder in tmp
  translationsFiles: [
    'sources/translations/*.po', /// all .po from src
  ],
  translatableFiles: [
    'sources/main/*!(.test).js', // .js from main
    'sources/modules/*!(.test).js', // .js from modules
    'sources/**/*.view.html', // all views
    'sources/index.html' // main html
  ],
  translationsBase: 'sources/translations' // folder containing translations from src

};

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
  exclude: [/jquery/, /bootstrap.js$/, /bootstrap\.css/],
  directory: exports.paths.bower
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
