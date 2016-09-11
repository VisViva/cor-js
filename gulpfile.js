var gulp = require('gulp');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');

gulp.task('default', function() {
  gulp.src('./dist/core.js')
  .pipe(rename(function (path) {
    path.basename += ".min";
  }))
  .pipe(uglify({
    mangle: true,
    compress: true
  }))
  .pipe(gulp.dest("./dist/"));
});
