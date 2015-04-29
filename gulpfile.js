var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    jsonminify = require('gulp-jsonminify'),
    concat = require('gulp-concat');
    



    
    var env,
        sassSources,
        htmlSources,
        jsonSources,
        coffeeSources,
        outputDir,
        jsSources,
        sassStyle;


    var env = process.env.NODE_ENV || 'development';


    if(env==='development'){
    	outputDir = 'builds/development/';
    	sassStyle = 'expanded';
    }else{
    	outputDir = 'builds/production/';
    	sassStyle = 'compressed';
    }
   

   coffeeSources = ['components/coffee/*.coffee'];
   jsSources = ['components/scripts/*.js'];
   sassSources = ['components/sass/style.scss'];
   htmlSources = [outputDir + '*.html'];
   jsonSources = [outputDir + '*.json'];


   gulp.task('coffee', function() {
    	gulp.src(coffeeSources)
    	.pipe(coffee({bare : true})
    	.on('error', gutil.log))
    	.pipe(gulp.dest('components/scripts'))
    });


    gulp.task('js', function() {
        gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(gulpif(env==='production', uglify()))
        .pipe(gulp.dest(outputDir + 'js'))
        .pipe(connect.reload())
    });


    gulp.task('compass', function() {
        gulp.src(sassSources)
        .pipe(compass({
        	sass : 'components/sass',
        	image : outputDir + 'images',
        	style : 'expanded',
        	require : ['susy','breakpoint']

        })
        .on('error', gutil.log))
        .pipe(gulp.dest( outputDir + 'css'))
        .pipe(connect.reload())
    });


     gulp.task('watch', function() {
    	gulp.watch(coffeeSources, ['coffee']);
    	gulp.watch(jsSources, ['js']);
    	gulp.watch('components/sass/*.scss', ['compass']);
    	gulp.watch(htmlSources, ['html']);
    	gulp.watch('builds/development/js/*.json', ['json']);

    });


    gulp.task('html', function() {
    	gulp.src(htmlSources)
    	.pipe(gulpif(env==='production', minifyHTML()))
    	.pipe(gulpif(env==='production', gulp.dest(outputDir)))
    	.pipe(connect.reload())
    });


    gulp.task('json', function() {
    	gulp.src('builds/development/js/*.json')
    	.pipe(gulpif(env==='production', jsonminify()))
    	.pipe(gulpif(env==='production', gulp.dest('builds/production/js')))
    	.pipe(connect.reload())
    });


    

    gulp.task('connect', function() {
    	connect.server({
    		root : outputDir,
            livereload : true
    	});
    });




    gulp.task('default', ['html','json', 'coffee', 'js', 'compass', 'connect', 'watch']);

