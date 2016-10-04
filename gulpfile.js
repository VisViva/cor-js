var gulp = require('gulp');
var del = require('del');
var argv = require('yargs').argv;
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var inject = require('gulp-inject-string');

/**
 * Uglify the library
 */

gulp.task('uglify', function() {
    return gulp.src('./dist/core.js')
        .pipe(rename(function(path) {
            path.basename += ".min";
        }))
        .pipe(uglify({
            mangle: true,
            compress: true
        }))
        .pipe(gulp.dest("./dist/"));
});

/**
 * Generate a webpack configuration file for the development server
 * with a custom entry point passed as a command line argument
 */

gulp.task('replace', function() {
    gulp.src('./webpack/webpack.server.config.js')
        .pipe(inject.replace('{{sample}}', argv.entry))
        .pipe(rename('webpack.server.entry.config.js'))
        .pipe(gulp.dest('./webpack/'));
});

/**
 * Entry point
 */

gulp.task('default', ['uglify']);
