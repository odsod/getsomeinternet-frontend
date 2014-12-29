var gulp = require('gulp');

var source = require('vinyl-source-stream');
var browserify = require('browserify');

gulp.task('browserify', function() {
  browserify('./src/index.js').bundle()
      .pipe(source('script.js'))
      .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['browserify'])
});

gulp.task('default', ['browserify']);
