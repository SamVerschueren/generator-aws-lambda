'use strict';

/**
 * Tasks that will zip all the files so that the zip file can be deployed to
 * AWS Lambda.
 *
 * @author <%= name %>		<<%= email %>>
 * @since  <%= date %>
 */

// module dependencies
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var install = require('gulp-install');
var zip = require('gulp-zip');
var strip = require('gulp-strip-comments');
var removeEmptyLines = require('gulp-remove-empty-lines');
var del = require('del');
var deptree = require('dependency-tree');
var pkg = require('./package.json');

var regex = new RegExp('node_modules\/(.*?)\/');

function clean(tree, module) {
	var result = {};

	Object.keys(tree).forEach(function (key) {
		if (key.indexOf('node_modules/' + module) === -1) {
			result[key] = clean(tree[key], module);
		}
	});

	return result;
}

function deps(tree, result) {
	result = result || {};

	Object.keys(tree).forEach(function (key) {
		var match = regex.exec(key);

		if (match) {
			result[match[1]] = (result[match[1]] || 0) + 1;
		}

		deps(tree[key], result);
	});

	return result;
}

var tree = deptree({filename: pkg.main, root: __dirname});
var cleaned = deps(clean(tree, 'aws-sdk'));
var cleanUpArray = Object.keys(deps(tree)).filter(function (key) {
	return cleaned[key] === undefined;
});

gulp.task('clean', ['zip'], function () {
	return del('.temp');
});

gulp.task('cleanDeps', ['copyAndInstall'], function () {
	// Remove all the dependencies that are not used by our code.
	return del(cleanUpArray.map(function (module) {
		return '.temp/node_modules/{' + module + ',' + module + '/**}';
	}));
});

gulp.task('copyAndInstall', function () {
	var files = ['package.json'].concat(pkg.files);

	if (pkg.files === undefined) {
		files = ['./**', '!./**/*.md', '!gulpfile.js', '!./{dist,dist/**}', '!./{test,test/**}', '!./{node_modules,node_modules/**}'];
	} else {
		files = files.map(function (file) {
			try {
				if (fs.statSync(path.join(__dirname, file)).isDirectory()) {
					return path.join(file, '**/*');
				}
			} catch (err) {
				// do nothing
			}

			return file;
		});
	}

	return gulp.src(files, {base: '.'})
		.pipe(strip())
		.pipe(removeEmptyLines())
		.pipe(gulp.dest('.temp'))
		.pipe(install({production: true}));
});

gulp.task('zip', ['copyAndInstall', 'rmaws'], function () {
	return gulp.src('.temp/**')
		.pipe(zip('build.zip'))
		.pipe(gulp.dest('dist'));
});

gulp.task('build', ['copyAndInstall', 'cleanDeps', 'zip', 'clean']);
gulp.task('default', ['build']);
