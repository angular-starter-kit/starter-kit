'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('styles', function () {
  var lessOptions = {
    options: [
      conf.paths.bower,
      path.join(conf.paths.src, '/main'),
      conf.paths.src
    ]
  };

  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/modules/**/*.less'),
  ], { read: false });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(conf.paths.src + '/main/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// inject:styles',
    endtag: '// endinject',
    relative: true,
    addRootSlash: false
  };

  gulp.src([
    path.join(conf.paths.src, '/main/app.less')
  ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.src, '/main/')));

  return gulp.src([
    path.join(conf.paths.src, '/main/app.less')
  ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe($.sourcemaps.init())
    .pipe($.less(lessOptions)).on('error', conf.errorHandler('Less'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/css/')))
    .pipe(browserSync.reload({ stream: true }));
});
