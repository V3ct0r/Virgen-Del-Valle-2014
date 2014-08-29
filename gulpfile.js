"use strict"

// -- DEPENDENCIES -------------------------------------------------------------
var gulp        = require('gulp');
var html        = require('gulp-markdown');
var pdf         = require('gulp-markdown-pdf');
var connect     = require('gulp-connect');

// -- FILES --------------------------------------------------------------------
var path = {
  build : 'build'};

var source = {
  md: 'Programación Virgen del Valle 2014.md'};

// -- TASKS --------------------------------------------------------------------
gulp.task('html', function () {
    return gulp.src(source.md)
        .pipe(html())
        .pipe(gulp.dest(path.build))
        .pipe(connect.reload());
});

gulp.task('pdf', function () {
    return gulp.src(source.md)
        .pipe(pdf())
        .pipe(gulp.dest(path.build))
        .pipe(connect.reload());
});

gulp.task('webserver', function() {
  connect.server({ port: 8000, root: path.build, livereload: true });
});

gulp.task('init', function() {
  gulp.run(['html', 'pdf'])
});

gulp.task('default', function() {
  gulp.run(['webserver'])
  gulp.watch(source.md, ['html']);
  gulp.watch(source.md, ['pdf']);
});