var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');

gulp.task('serve', function() {
  connect.server({
    livereload: true,
    port: 7777
  });
});

gulp.task('html', function() {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('sass', function() {
  gulp.src('./styles/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('./styles/*.scss', ['sass']);
  gulp.watch('./*.html', ['html']);
});

// Development
gulp.task('default', ['serve', 'sass', 'html', 'watch']);

// Production builds
gulp.task('sassmin', function() {
  gulp.src('./styles/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(cssmin())
    .pipe(gulp.dest('./out/dist'));
});

gulp.task('htmlmin', function() {
  gulp.src('./*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./out'));
});

gulp.task('images', function() {
  gulp.src('./images/*.png')
    .pipe(gulp.dest('./out/images'));
});

gulp.task('vendor', function() {
  gulp.src('./vendor/*')
    .pipe(gulp.dest('./out/vendor'));
});

gulp.task('build', ['sassmin', 'htmlmin', 'images', 'vendor']);
