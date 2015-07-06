var gulp = require('gulp'),
	less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer-core'),
    notify = require('gulp-notify');

gulp.task('css', function() {
    return gulp
        .src(['less/flex.less', 'less/docs.less'])
        .pipe(less().on('error', notify.onError(function(error) {
            return 'Error compiling LESS: ' + error.message;
        })))
        .on('error', function() {
            this.emit('end');
        })
        .pipe(gulp.dest('css/'))
        .pipe(sourcemaps.init())
        .pipe(postcss([
            autoprefixer({
                browsers: ['last 2 version']
            })
        ]))
        .pipe(minifycss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['css', 'watch']);

gulp.task('watch', function() {
	gulp.watch(['less/*.less'], ['css']);
});
