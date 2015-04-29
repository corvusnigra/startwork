var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify');

    
    var coffeeSources = ['components/coffee/*'];
    var jsSources = ['components/scripts/*'];

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


