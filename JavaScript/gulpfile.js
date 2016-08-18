var gulp  = require('gulp'),
    gutil = require('gulp-util');
    sass = require('gulp-sass');
    browserSync = require('browser-sync').create();
    
gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});

gulp.task('styles', function() {
	gulp.src('source/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('public/css'))
		.pipe(browserSync.reload({
      		stream: true
		}))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'public'
    },
  })
});

gulp.task('default', ['browserSync', 'styles'],function() {
    gulp.watch('source/sass/**/*.scss',['styles']);
    gulp.watch('public/*.html', browserSync.reload);
});