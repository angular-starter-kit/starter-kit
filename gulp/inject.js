'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');
var wiredep = require('wiredep').stream;
var _ = require('lodash');

var $ = require('gulp-load-plugins')();

var injectCommonOptions = {
  ignorePath: [conf.paths.src, path.join(conf.paths.tmp)],
  addRootSlash: false
};

gulp.task('inject', ['inject:style', 'inject:script', 'bower:script']);

gulp.task('inject:style', ['styles'], function(){

  // Styles
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/**/*.css'),
    path.join('!' + conf.paths.tmp, '/vendor.css')
  ], { read: false });

 return gulp.src(path.join(conf.paths.src, 'index.html'))
    .pipe($.inject(injectStyles, injectCommonOptions))
    .pipe(gulp.dest(path.join(conf.paths.src)));
});

gulp.task('inject:script', ['scripts', 'partials'], function(){

  // Scripts
  var injectScripts = gulp.src([
    path.join(conf.paths.src, conf.paths.main , '/**/*.js'),
    path.join(conf.paths.src, '/modules/**/*.js'),
    path.join(conf.paths.tmp, '/**/*.js'),
    path.join('!' + conf.paths.tmp, '/libraries/**/*.js'),
    path.join('!' + conf.paths.src, '/**/*.test.js'),
    path.join('!' + conf.paths.src, '/**/*.spec.js'),
    path.join('!' + conf.paths.src, '/**/*.mock.js')
  ])
  .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  return gulp.src(path.join(conf.paths.src, 'index.html'))
    .pipe($.inject(injectScripts, injectCommonOptions))
    .pipe(gulp.dest(path.join(conf.paths.src)));
});

gulp.task('bower:script', function(){

  return gulp.src(path.join(conf.paths.src, 'index.html'))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.src)));
});