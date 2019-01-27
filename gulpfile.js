var {src, dest, parallel, watch} = require('gulp');
var gulpSass = require('gulp-sass');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');

gulpSass.compiler = require('node-sass');

exports.serve = function serve() {
  return connect.server({
    livereload: true,
    port: 7777
  });
};

exports.sass = function sass() {
  return src('./styles/*.scss')
    .pipe(gulpSass.sync().on('error', gulpSass.logError))
    .pipe(dest('./dist'))
    .pipe(connect.reload());
};

exports.html = function html() {
  return src('./*.html')
    .pipe(connect.reload());
};

exports.gulpWatch = function gulpWatch() {
  watch('./*.html', exports.html);
  watch('./styles/*.scss', exports.sass);
};

// Development
exports.default = parallel([exports.serve, exports.gulpWatch]);

// Production builds
exports.sassmin = function sassmin() {
  return src('./styles/*.scss')
    .pipe(gulpSass.sync().on('error', gulpSass.logError))
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(dest('./out/dist'));
};

exports.htmlmin = function htmlmin() {
  return src('./*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(dest('./out'));
};

exports.images = function images() {
  return src('./images/*.png')
    .pipe(dest('./out/images'));
};

exports.vendor = function vendor() {
  return src('./vendor/*')
    .pipe(dest('./out/vendor'));
};

exports.favicons = function favicons() {
  return src('./favicons/*')
    .pipe(dest('./out'));
};

exports.files = function files() {
  return src('./files/*')
    .pipe(dest('./out/files'));
};

exports.build = parallel([exports.sassmin, exports.htmlmin, exports.images, exports.vendor, exports.favicons, exports.files]);
