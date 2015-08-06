'use strict';

// -----------------------------------------------------
// Translations
// -----------------------------------------------------

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

gulp.task('translations', function () {
  return gulp.src(conf.paths.translationsFiles)
    .pipe($.angularGettext.compile({
      module: 'translations'
    }))
    .pipe($.concat('translations.js'))
    .pipe(gulp.dest(path.join(conf.paths.tmp, conf.paths.translations)));
});

gulp.task('translations:extract', function () {
  return gulp.src(conf.paths.translatableFiles)
    .pipe($.angularGettext.extract('template.pot', {}))
    .pipe(gulp.dest(conf.paths.translationsBase));
});