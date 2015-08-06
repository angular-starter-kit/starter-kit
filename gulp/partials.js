'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');

var $ = require('gulp-load-plugins')();

gulp.task('partials', function () {
  return gulp.src([
    path.join(conf.paths.src, '/**/*.html'),
    path.join(conf.paths.tmp, '/**/*.html')
  ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'app',
      root: ''
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});