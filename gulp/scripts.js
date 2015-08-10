'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');
var stylish = require('gulp-jscs-stylish');
var browserSync = require('browser-sync');
var noop = function () {};

var $ = require('gulp-load-plugins')();

var noop = function () {};

gulp.task('scripts', function () {
  return gulp.src([
    path.join(conf.paths.src, '/modules/**/*.js'),
    path.join(conf.paths.src, '/main/app.js')
  	])
    .pipe($.jshint()) // jshint, it follows .jshintrc
    .pipe($.jscs()) // jscs, it follows .jscsrc
    .on('error', noop) // don't stop on error
    .pipe(stylish.combineWithHintResults()) // combine results
    .pipe($.jshint.reporter('jshint-stylish')) // reporter
    .pipe(browserSync.reload({ stream: true }))
    .pipe($.size()); // Display the size
});
