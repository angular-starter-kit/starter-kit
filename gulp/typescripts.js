'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();

var tsProject = $.typescript.createProject({
    target: 'es5',
    sortOutput: true
});

gulp.task('typescripts', function () {
  return gulp.src([
    path.join(conf.paths.src, '/modules/**/*.ts'),
    path.join(conf.paths.src, '/main/app.ts')
    ])
    .pipe($.sourcemaps.init())
    .pipe($.tslint())
    .pipe($.tslint.report('prose', { emitError: false }))
    .pipe($.typescript(tsProject)).on('error', conf.errorHandler('TypeScript'))
    .pipe($.concat('app.ts.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp)))
    .pipe(browserSync.reload({ stream: true }))
    .pipe($.size());
});