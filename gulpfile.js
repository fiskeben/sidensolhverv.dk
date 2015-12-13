var gulp = require('gulp'),
  browserify = require('browserify'),
  babelify = require('babelify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer');

gulp.task('build', function () {
  var bundleStream = browserify({
    entries: ['./views/javascript/index.js']
  })
  .transform(babelify, {presets: ["react"]})
  .bundle();

  bundleStream
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('public/assets/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
});

gulp.task('default', ['watch', 'build']);
