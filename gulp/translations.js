'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');
var $ = require('gulp-load-plugins')();

gulp.task('translations', function () {
  return gulp.src(path.join(conf.paths.src, 'translations/*.po'))
    .pipe($.angularGettext.compile({
      module: 'translations'
    }))
    .pipe($.concat('translations.js'))
    .pipe(gulp.dest(path.join(conf.paths.tmp, 'translations')));
});

gulp.task('translations:extract', function () {
  return gulp.src([
    path.join(conf.paths.src, 'main/*!(.test).js'),    // .js from main
    path.join(conf.paths.src, 'modules/*!(.test).js'), // .js from modules
    path.join(conf.paths.src, '**/*.html')          // all html
  ], { base: conf.paths.src } )
    .pipe($.angularGettext.extract('template.pot', {}))
    .pipe(gulp.dest(path.join(conf.paths.src, 'translations')));
});