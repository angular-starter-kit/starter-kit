'use strict';

var gulp = require('gulp');
var conf = require('../gulpfile.config');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  var server = {
    baseDir: baseDir,
    routes: null
  };

  // We activate a proxy if we found a configuration for it.
  if (conf.proxy && conf.proxy.context){
    var proxyMiddleware = require('http-proxy-middleware');
    server.middleware = proxyMiddleware(conf.proxy.context, conf.proxy.options);
  }

  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: browser
  });
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve', ['watch'], function () {
  browserSyncInit([conf.paths.tmp, conf.paths.src]);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit(conf.paths.dist);
});

gulp.task('serve:e2e', ['inject'], function () {
  browserSyncInit([conf.paths.tmp, conf.paths.src], []);
});

gulp.task('serve:e2e-dist', ['build'], function () {
  browserSyncInit(conf.paths.dist, []);
});
