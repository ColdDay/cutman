'use strict';
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var fileinclude  = require('gulp-file-include');
var uglify = require('gulp-uglify');
var obfuscate = require('gulp-obfuscate');
var cssnano = require('gulp-cssnano');
const babel = require('gulp-babel');

//模板编辑
gulp.task('fileinclude', function() {
    gulp.src('src/html/**/*.html')
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
    .pipe(gulp.dest('public/html'));
});

//样式
gulp.task('sass', function () {
  return gulp.src('src/html/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(cssnano())
    .pipe( gulp.dest('public/html/'));
});
//JS压缩
gulp.task('jsMin', function() {  
    return gulp.src('src/html/**/*.js') 
        //.pipe(obfuscate())
        // .pipe(uglify())
        .pipe(gulp.dest('public/html'));  
});  

gulp.task('default', function () {
	gulp.watch('src/html/**/*.html', ['fileinclude']);
	gulp.watch('src/html/**/*.scss', ['sass']);
	gulp.watch('src/html/**/*.js', ['jsMin']);
});
