'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del', 'vinyl-paths']
});


gulp.task('jade', function() {
  function renameToHtml(path) {
    path.extname = '.html';
  }

  return gulp.src(path.join(conf.paths.src, '/**/*.jade'))
    .pipe($.consolidate('jade', {
      basedir: conf.paths.src,
      doctype: 'html',
      pretty: '  '
    }))
    .on('error', conf.errorHandler('Jade'))
    .pipe($.rename(renameToHtml))
    .pipe(gulp.dest(path.join(conf.paths.tmp)))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('jade:convert', function() {
  return gulp.src(path.join(conf.paths.src, '/modules/**/*.html'))
    .pipe($.shell('html2jade <%= file.path %> --donotencode --bodyless --noemptypipe'), {verbose: true})
    .pipe($.vinylPaths($.del));
});
