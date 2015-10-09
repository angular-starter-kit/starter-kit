'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var conf = require('../gulpfile.config');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');
var HttpsProxyAgent = require('https-proxy-agent');

function setupCorporateProxy(options) {
  var proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
  if (proxyServer) {
    options.agent = new HttpsProxyAgent(proxyServer);
    gutil.log(gutil.colors.cyan('Using corporate proxy server: ' + proxyServer));
  }
  return options;
}

function browserSyncInit(baseDir, browser, done) {
  browser = browser === undefined ? 'default' : browser;

  var server = {
    baseDir: baseDir,
    routes: null
  };

  // We activate a server proxy if we found a configuration for it.
  if (conf.backendProxy) {
    var proxyMiddleware = require('http-proxy-middleware');
    var options = setupCorporateProxy(conf.backendProxy.options);
    server.middleware = proxyMiddleware(conf.backendProxy.context, options);
  }

  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: browser
  }, done);
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve', ['watch'], function(done) {
  browserSyncInit([conf.paths.tmp, conf.paths.src], undefined, done);
});

gulp.task('serve:dist', ['build'], function(done) {
  browserSyncInit(conf.paths.dist, undefined, done);
});

gulp.task('serve:e2e', ['inject'], function(done) {
  browserSyncInit([conf.paths.tmp, conf.paths.src], [], done);
});

gulp.task('serve:e2e-dist', ['build'], function(done) {
  browserSyncInit(conf.paths.dist, [], done);
});
