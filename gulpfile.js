var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

gulp.task('serve', function() {
  connect.server({
    livereload: true,
    port: 7777
  });
});

gulp.task('html', function() {
  gulp.src('index.html')
    .pipe(connect.reload());
});

gulp.task('sass', function() {
  gulp.src('styles/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('styles/*.scss', ['sass']);
  gulp.watch('index.html', ['html']);
});

gulp.task('default', ['serve', 'sass', 'html', 'watch']);
