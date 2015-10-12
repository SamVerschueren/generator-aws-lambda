'use strict';

/**
 * Tasks that will zip all the files so that the zip file can be deployed to
 * AWS Lambda.
 *
 * @author <%= name %>		<<%= email %>>
 * @since  <%= date %>
 */

// module dependencies
var gulp = require('gulp');
var install = require('gulp-install');
var zip = require('gulp-zip');
var del = require('del');

gulp.task('clean', ['zip'], function () {
	return del('.temp');
});

gulp.task('copyAndInstall', function () {
	return gulp.src(['./**', '!./**/*.md', '!.gitignore', '!gulpfile.js', '!travis.yml', '!./{dist,dist/**}', '!./{test,test/**}', '!./{node_modules,node_modules/**}'])
		.pipe(gulp.dest('.temp'))
		.pipe(install({production: true}));
});

gulp.task('zip', ['copyAndInstall'], function () {
	return gulp.src('.temp/**')
		.pipe(zip('build.zip'))
		.pipe(gulp.dest('.'));
});

gulp.task('build', ['zip', 'clean']);
gulp.task('default', ['build']);
