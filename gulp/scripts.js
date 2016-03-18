'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulpfile.config');
var webpack = require('webpack-stream');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

function buildScripts(watch, test, done) {
  var options = {
    resolve: {
      root: conf.src,
      modulesDirectories: [
        '.',
        'main',
        'modules',
        'libraries'
      ],
      extensions: ['', '.ts']
    },
    watch: watch,
    module: {
      preLoaders: [{
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'tslint-loader'
      }],
      loaders: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loaders: ['ng-annotate', 'awesome-typescript-loader']
        },
        {
          test: /\.html$/,
          loader: 'raw!html-minify'
        }
      ]
    },
    'html-minify-loader': {
      empty: true,
      cdata: true,
      comments: true,
      conditionals: true,
      quotes: true,
      dom: {
        lowerCaseAttributeNames: false,
        lowerCaseTags: false
      }
    },
    output: {filename: 'app.ts.js'}
  };

  if (watch) {
    options.devtool = 'inline-source-map';
  }

  var webpackChangeHandler = function(err, stats) {
    if (err) {
      conf.errorHandler('Webpack')(err);
    }

    $.util.log(stats.toString({
      colors: $.util.colors.supportsColor,
      chunks: false,
      hash: false,
      version: false
    }));

    browserSync.reload();

    if (watch) {
      watch = false;
      done();
    }
  };

  var sources = [
    path.join(conf.paths.src, '**/*.ts'),
    path.join('!' + conf.paths.bower, '/**/*.ts')
  ];

  if (!test) {
    sources.push(path.join('!' + conf.paths.src, '/**/*.spec.ts'));
    sources.push(path.join('!' + conf.paths.src, '/**/*.mock.ts'));
  }

  return gulp.src(sources)
    .pipe(webpack(options, null, webpackChangeHandler))
    .pipe(gulp.dest(path.join(conf.paths.tmp)));
}

gulp.task('scripts', function() {
  return buildScripts(false, false);
});

gulp.task('scripts:watch', ['scripts'], function(done) {
  return buildScripts(true, false, done);
});

gulp.task('scripts:test', function() {
  return buildScripts(false, true);
});

gulp.task('scripts:test-watch', ['scripts'], function(done) {
  return buildScripts(true, true, done);
});
