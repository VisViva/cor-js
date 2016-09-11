var gulp = require('gulp');
var del = require('del');
var tsc = require("gulp-tsc");
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');

/**
 * Generate typescript definitions file
 */

gulp.task('define-generate', function() {
  return gulp.src(['./src/core.ts'])
  .pipe(tsc({
    module: 'amd',
    out: 'core.js',
    declaration: true
  }))
  .pipe(gulp.dest('temp/'));
});

gulp.task('define-move', ['define-generate'], function() {
  return gulp.src('./temp/core.d.ts')
  .pipe(gulp.dest('dist/'));
});

gulp.task('define-cleanup', ['define-generate', 'define-move'], function() {
  return del('temp');
});

gulp.task('define', ['define-generate', 'define-move', 'define-cleanup']);

/**
 * Uglify the library
 */

gulp.task('uglify', function() {
  return gulp.src('./dist/core.js')
  .pipe(rename(function (path) {
    path.basename += ".min";
  }))
  .pipe(uglify({
    mangle: true,
    compress: true
  }))
  .pipe(gulp.dest("./dist/"));
});

/**
 * Entry point
 */

gulp.task('default', ['define', 'uglify']);
