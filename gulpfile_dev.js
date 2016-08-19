var gulp = require ("gulp");
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var runSequence = require('run-sequence');
var del = require('del');
var gulpif = require('gulp-if');
var cssNano = require('gulp-cssnano');
var gulpIgnore = require('gulp-ignore');

var htmlDir = '';
var appDir = '';
var dist = '';

gulp.task('default', function(){
	runSequence ('clean:dist',['html','scripts']);
});
gulp.task('clean:dist', function() {
  return del.sync(dist,{force:true});
});
gulp.task('html', function () {
	return gulp.src(htmlDir + '/**/*.html')
        .pipe(useref())
        .pipe(gulp.dest(dist));
});
gulp.task('scripts', function () {
	return gulp.src([appDir + "/**/*.*"])
				.pipe(gulpIgnore.exclude('*.html'))
        .pipe(gulp.dest(dist));
});
