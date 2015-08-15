'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', ['inject'], function () {

  var options = {
    debounceDelay: 500
  };

  gulp.watch([
    path.join(conf.paths.src, '/*.html'),
    'bower.json'
  ], options, ['inject']);

  gulp.watch([
    path.join(conf.paths.src, '/**/*.css'),
    path.join(conf.paths.src, '/**/*.less')
  ], options, function(event) {
    if (isOnlyChange(event)) {
      gulp.start('styles');
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch(path.join(conf.paths.src, '/**/*.js'), options, function(event) {
    if (isOnlyChange(event)) {
      gulp.start('scripts');
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch(path.join(conf.paths.src, '/**/*.html'), options, ['partials']);

  gulp.watch(path.join(conf.paths.src, '/**/*.po'), options, ['translations']);

  gulp.watch(path.join(conf.paths.tmp, '/**/*.js'), options, function(event) {
    browserSync.reload(event.path);
  });
});
