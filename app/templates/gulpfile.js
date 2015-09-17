'use strict';

/**
 * Tasks that will zip all the files so that the zip file can be deployed to
 * AWS Lambda.
 *
 * @author <%= name %>      <<%= email %>>
 * @since  <%= date %>
 */

// module dependencies
var gulp = require('gulp'),
    zip = require('gulp-zip'),
    decamelize = require('decamelize');

var pkg = require('./package.json');

/**
 * Creates a zip file
 */
gulp.task('zip', function() {
    var name = decamelize(pkg.name);

    // Ignore all the dev dependencies and the bin folder
    var ignoreModules = Object.keys(pkg.devDependencies);
    ignoreModules.push('.bin');

    // Map the array to a list of globbing patterns
    var ignore = ignoreModules.map(function(dep) {
        return '!node_modules/{' + dep + ',' + dep + '/**}';
    });

    // Zip the code
    return gulp.src(['./**', '!./**/*.md', '!.gitignore', '!gulpfile.js', '!./{dist,dist/**}', '!./{test,test/**}', '!./**/{aws-sdk,aws-sdk/**}'].concat(ignore), {base: '.'})
        .pipe(zip(name + '.zip'))
        .pipe(gulp.dest('dist'));
});