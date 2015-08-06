'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('inject', ['scripts', 'styles', 'partials', 'translations'], function () {

  // Styles
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/**/*.css'),
    path.join('!' + conf.paths.tmp, '/vendor.css')
  ], { read: false });

  // Scripts
  var injectScripts = gulp.src([
    path.join(conf.paths.src, '/modules/**/*.js'),
    path.join(conf.paths.src, '/main/app.js'),
    path.join('!' + conf.paths.src, '/modules/**/*.test.js'),
    path.join('!' + conf.paths.src, '/modules/**/*.mock.js')
  ])
  .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  // Partials
  var injectPartials = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
  var injectPartialsOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(conf.paths.tmp),
    addRootSlash: false
  };

  // Translations
  var injectTranslations = gulp.src(path.join(conf.paths.tmp, '/translations/translations.js'), { read: false });
  var injectTranslationsOptions = {
    starttag: '<!-- inject:translations -->',
    ignorePath: path.join(conf.paths.tmp),
    addRootSlash: false
  };

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp)],
    addRootSlash: false
  };

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe($.inject(injectPartials, injectPartialsOptions))
    .pipe($.inject(injectTranslations, injectTranslationsOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp)));
});
