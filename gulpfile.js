var gulp = require('gulp');

var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

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

gulp.task('lint', function() {
  return gulp.src('./src/**/*.js')
      .pipe(jscs())
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(jshint.reporter('fail'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['browserify']);
});

gulp.task('default', ['lint', 'browserify']);
