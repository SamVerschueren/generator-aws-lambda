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

gulp.task('rmaws', ['copyAndInstall'], function () {
	return del('.temp/node_modules/aws-sdk');
});

gulp.task('copyAndInstall', function () {
	return gulp.src(['./**', '!./**/*.md', '!.gitignore', '!.aws.json', '!gulpfile.js', '!.travis.yml', '!./{dist,dist/**}', '!./{test,test/**}', '!./{node_modules,node_modules/**}'])
		.pipe(gulp.dest('.temp'))
		.pipe(install({production: true}));
});

gulp.task('zip', ['copyAndInstall', 'rmaws'], function () {
	return gulp.src('.temp/**')
		.pipe(zip('build.zip'))
		.pipe(gulp.dest('dist'));
});

gulp.task('build', ['copyAndInstall', 'rmaws', 'zip', 'clean']);
gulp.task('default', ['build']);
