'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', ['inject'], function() {
  var options = {
    debounceDelay: 500
  };

  gulp.watch(path.join(conf.paths.src, 'bower.json'), options, ['inject']);

  gulp.watch([
    path.join(conf.paths.src, '/**/*.css'),
    path.join(conf.paths.src, '/**/*.scss')
  ], options, function(event) {
    if (isOnlyChange(event)) {
      gulp.start('styles');
    } else {
      gulp.start('inject:style');
    }
  });

  gulp.watch(path.join(conf.paths.src, '/**/*.js'), options, function(event) {
    if (isOnlyChange(event)) {
      gulp.start('scripts');
    } else {
      gulp.start('inject:script');
    }
  });

  gulp.watch(path.join(conf.paths.src, '/**/*.ts'), options, ['typescript']);

  gulp.watch(path.join(conf.paths.src, '/**/*.html'), options, ['partials']);

  gulp.watch(path.join(conf.paths.src, '/**/*.po'), options, ['translations']);

  gulp.watch([
    path.join(conf.paths.tmp, '/**/*.js'),
    path.join(conf.paths.src, '/*.html')
  ], options, function(event) {
    browserSync.reload(event.path);
  });
});
