'use strict';

var gulp = require('gulp');
var webpack = require('webpack-stream');
var uglify = require('gulp-uglify');
var include = require('gulp-include');
var plumber = require('gulp-plumber');
var chokidar = require('chokidar');

var config = require('./includes/config.js');
var messages = require('./includes/messages.js');
var utils = require('./includes/utilities.js');

function processThemeJs() {
  messages.logProcessFiles('build:js');
  return gulp.src([config.roots.js, '!' + config.roots.vendorJs, '!' + config.roots.webpackJs]).pipe(plumber(utils.errorHandler)).pipe(include()).pipe(gulp.dest(config.dist.assets));
}

function processVendorJs() {
  messages.logProcessFiles('build:vendor-js');
  return gulp.src(config.roots.vendorJs).pipe(plumber(utils.errorHandler)).pipe(include()).pipe(uglify({
    mangle: true,
    compress: true,
    preserveComments: 'license'
  })).pipe(gulp.dest(config.dist.assets));
}

function processWebpackJs() {
  messages.logProcessFiles('build:webpack-js');
  return gulp.src(['node_modules/babel-polyfill/dist/polyfill.js']).pipe(plumber(utils.errorHandler)).pipe(webpack(require(config.webpackConfig))).pipe(gulp.dest(config.dist.assets));
}

gulp.task('build:js', function () {
  processThemeJs();
});

gulp.task('watch:js', function () {
  chokidar.watch([config.src.js, '!' + config.roots.vendorJs, '!' + config.src.vendorJs, '!' + config.roots.webpackJs, '!' + config.src.webpackJs], { ignoreInitial: true }).on('all', function (event, path) {
    messages.logFileEvent(event, path);
    processThemeJs();
    processWebpackJs();
  });
});

gulp.task('build:vendor-js', function () {
  processVendorJs();
});

gulp.task('watch:vendor-js', function () {
  chokidar.watch([config.roots.vendorJs, config.src.vendorJs], { ignoreInitial: true }).on('all', function (event, path) {
    messages.logFileEvent(event, path);
    processVendorJs();
  });
});

gulp.task('build:webpack-js', function () {
  processWebpackJs();
});

gulp.task('watch:webpack-js', function () {
  chokidar.watch([config.roots.webpackJs, config.src.webpackJs], { ignoreInitial: true }).on('all', function (event, path) {
    messages.logFileEvent(event, path);
    processWebpackJs();
  });
});