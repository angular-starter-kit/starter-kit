'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');
var karma = require('karma');

function runTests(singleRun, done) {
  var server = new karma.Server({
    configFile: path.join(__dirname, '/../karma.conf.js'),
    singleRun: singleRun,
    autoWatch: !singleRun
  }, function() {
    done();
  });
  server.start();
}

gulp.task('scripts:dependencies', ['translations', 'partials']);

gulp.task('test', ['scripts:test', 'scripts:dependencies'], function(done) {
  runTests(true, done);
});

gulp.task('test:auto', ['scripts:test-watch', 'scripts:dependencies'], function(done) {
  runTests(false, done);
});
