var gulp = require('gulp');

var source = require('vinyl-source-stream');
var browserify = require('browserify');

gulp.task('browserify', function() {
  browserify('./src/index.js').bundle()
      .on('error', function(err) {
        console.log(err.message);
        this.end();
      })
      .pipe(source('script.js'))
      .pipe(gulp.dest('./public'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['browserify'])
});

gulp.task('default', ['browserify']);
