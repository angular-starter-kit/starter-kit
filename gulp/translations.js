'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');
var $ = require('gulp-load-plugins')();

gulp.task('translations', function () {
  return gulp.src(path.join(conf.paths.src, 'translations/*.po'))
    .pipe($.angularGettext.compile({
      module: 'main'
    }))
    .pipe($.concat('translations.js'))
    .pipe(gulp.dest(path.join(conf.paths.tmp, 'translations')));
});

gulp.task('translations:extract', function () {
  return gulp.src([
    'main/*!(.test).js',    // .js from main
    'modules/*!(.test).js', // .js from modules
    '**/*.html'             // all html
  ], { cwd: conf.paths.src } )
    .pipe($.angularGettext.extract('template.pot', {}))
    .pipe(gulp.dest(path.join(conf.paths.src, 'translations')));
});
