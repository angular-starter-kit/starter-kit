'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');
var stylish = require('gulp-jscs-stylish');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

function noop() {}

var tsProject = $.typescript.createProject('tsconfig.json', {sortOutput: true});

gulp.task('typescript', function() {
  return gulp.src([
      path.join(conf.paths.src, '/main/**/*.ts'),
      path.join(conf.paths.src, '/modules/**/*.ts')
    ])
    .pipe($.sourcemaps.init())
    .pipe($.tslint())
    .pipe($.tslint.report('prose', {emitError: false}))
    .pipe($.typescript(tsProject)).on('error', conf.errorHandler('TypeScript'))
    .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'))
    .pipe($.concat('app.ts.js'))
    .pipe($.sourcemaps.write({
      includeContent: true,
      sourceRoot: '../'
    }))
    .pipe(gulp.dest(path.join(conf.paths.tmp)));
});

gulp.task('scripts', ['typescript'], function() {
  return gulp.src([
      path.join(conf.paths.src, '/**/*.js'),
      path.join('!' + conf.paths.src, '/libraries/**/*.js')
    ])
    .pipe($.jshint())
    .pipe($.jscs())
    .on('error', noop) // don't stop on error
    .pipe(stylish.combineWithHintResults())
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('scripts:reload', ['scripts'], function() {
  browserSync.reload();
});
