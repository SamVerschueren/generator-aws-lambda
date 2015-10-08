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
var zip = require('gulp-zip');
var pkg = require('./package.json');

/**
 * Creates a zip file
 */
gulp.task('zip', function () {
	// Ignore all the dev dependencies and the bin folder
	var ignoreModules = Object.keys(pkg.devDependencies);
	ignoreModules.push('.bin');

	// Map the array to a list of globbing patterns
	var ignore = ignoreModules.map(function (dep) {
		return '!node_modules/{' + dep + ',' + dep + '/**}';
	});

	// Zip the code
	return gulp.src(['./**', '!./**/*.md', '!.gitignore', '!gulpfile.js', '!./{dist,dist/**}', '!./{test,test/**}', '!./**/{aws-sdk,aws-sdk/**}'].concat(ignore), {base: '.'})
		.pipe(zip('build.zip'))
		.pipe(gulp.dest('dist'));
});
