'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('inject', ['scripts', 'styles', 'partials', 'translations'], function () {

  // Styles
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/**/*.css'),
    path.join('!' + conf.paths.tmp, '/vendor.css')
  ], { read: false });

  // Scripts
  var injectScripts = gulp.src([
    path.join(conf.paths.src, '/' + conf.paths.main + '/*.js'),
    path.join(conf.paths.src, '/modules/**/*.js'),
    path.join(conf.paths.tmp, '/**/*.js'),
    path.join('!' + conf.paths.tmp, '/librairies/**/*.js'),
    path.join('!' + conf.paths.src, '/**/*.test.js'),
    path.join('!' + conf.paths.src, '/**/*.mock.js')
  ])
  .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp)],
    addRootSlash: false
  };

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp)))
    .pipe(gulp.dest(path.join(conf.paths.src)));
});
