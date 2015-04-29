var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat');

    var sassSources = ['components/sass/style.scss'];
    var coffeeSources = ['components/coffee/*'];
    var jsSources = ['components/scripts/*'];

    gulp.task('watch', function() {
    	gulp.watch(coffeeSources, ['coffee']);
    	gulp.watch(jsSources, ['js']);
    	gulp.watch('components/sass/*.scss', ['compass']);

    });


    gulp.task('compass', function() {
        gulp.src(sassSources)
        .pipe(compass({
        	sass : 'components/sass',
        	image : 'builds/development/images',
        	style : 'expanded',
        	require : ['susy','breakpoint']

        })
        .on('error', gutil.log))
        .pipe(gulp.dest('builds/development/css'))
    });


    gulp.task('js', function() {
        gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(gulp.dest('builds/development/js'))
    });


    gulp.task('log', function() {
    	gutil.log('work')
    });


    gulp.task('coffee', function() {
    	gulp.src(coffeeSources)
    	.pipe(coffee({bare : true})
    	.on('error', gutil.log))
    	.pipe(gulp.dest('components/scripts'))
    });


    gulp.task('default', ['coffee', 'js', 'compass', 'watch']);

