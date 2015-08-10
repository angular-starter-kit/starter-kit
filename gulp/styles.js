'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');
var mainFolder = path.join(conf.paths.src, '/main/');

gulp.task('styles', ['fonts'], function () {
  var lessOptions = {
    options: [
      conf.paths.bower,
      mainFolder,
      conf.paths.src
    ]
  };

  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/modules/**/*.less'),
  ], { read: false });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(mainFolder, '');
      return '@import "' + filePath + '";';
    },
    starttag: '// inject:styles',
    endtag: '// endinject',
    relative: true,
    addRootSlash: false
  };

  return gulp.src(path.join(mainFolder, 'app.less'))
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(mainFolder))
    .pipe($.sourcemaps.init())
    .pipe($.less(lessOptions)).on('error', conf.errorHandler('Less'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/css/')))
    .pipe(browserSync.reload({ stream: true }));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
  return gulp.src(path.join(conf.paths.bower, '/**/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/fonts/')));
});
