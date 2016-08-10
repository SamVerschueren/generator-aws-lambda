'use strict';

/**
 * Yeoman generator for AWS Lambda functions in NodeJS.
 *
 * @author Sam Verschueren	  <sam.verschueren@gmail.com>
 * @since  21 Aug. 2015
 */

// module dependencies
var path = require('path');
var yeoman = require('yeoman-generator');
var moment = require('moment');
var uppercamelcase = require('uppercamelcase');
var _s = require('underscore.string');

var features = {
	'dynongo': '^0.7.0',
	'pify': '^2.3.0'
};

module.exports = yeoman.Base.extend({
	init: function () {
		var done = this.async();

		var featurePrompt = {
			name: 'features',
			message: 'What more would you like?',
			type: 'checkbox',
			choices: []
		};

		Object.keys(features).forEach(function (feature) {
			featurePrompt.choices.push({name: feature, value: feature});
		});

		// Ask the questions
		this.prompt([
			{
				name: 'functionName',
				message: 'What\'s the name of your service?',
				default: this.appname.replace(/\s/g, '-'),
				filter: x => _s.slugify(x)
			},
			{
				name: 'functionDescription',
				message: 'What\'s the description of the service?',
				validate: function (val) {
					return val.length > 0 ? true : 'You have to provide a description';
				}
			},
			{
				name: 'keywords',
				message: 'Provide a list of keywords (comma- or space-separated)?',
				filter: function (keywords) {
					return keywords.replace(/,? /g, ',').split(',');
				}
			},
			{
				name: 'githubUsername',
				message: 'What\'s your GitHub username?',
				store: true,
				filter: function (username) {
					return username.trim();
				}
			},
			{
				name: 'name',
				message: 'What\'s your name?',
				store: true,
				when: function (props) {
					return props.githubUsername.length === 0;
				},
				validate: function (val) {
					return val.length > 0 ? true : 'You have to provide your name';
				}
			},
			{
				name: 'email',
				message: 'What\'s your email address?',
				store: true,
				when: function (props) {
					return props.githubUsername.length === 0;
				},
				validate: function (val) {
					return val.length > 0 ? true : 'You have to provide your email address';
				}
			},
			{
				name: 'invoke',
				message: 'Do you want to invoke other services?',
				type: 'confirm',
				default: true
			},
			{
				name: 'docs',
				message: 'Do you want to generate API docs?',
				type: 'confirm',
				default: true
			},
			featurePrompt
		], function (props) {
			// Build the list of dependencies
			var dependencies = {};
			if (props.invoke) {
				dependencies['bragg-route-invoke'] = '^1.0.2';
			}

			// Build up the template
			var tpl = {
				functionName: props.functionName,
				functionDescription: props.functionDescription,
				keywords: props.keywords,
				name: props.name || this.user.git.name(),
				email: props.email || this.user.git.email(),
				invoke: props.invoke,
				generateDocs: props.docs,
				dependencies: dependencies,
				date: moment().format('DD MMM. YYYY')
			};

			Object.keys(features).forEach(function (feature) {
				var hasFeature = props.features.indexOf(feature) !== -1;

				if (hasFeature) {
					tpl.dependencies[feature] = features[feature];
				}

				tpl['include' + uppercamelcase(feature)] = hasFeature;
			});

			var mv = function (from, to) {
				this.fs.move(this.destinationPath(from), this.destinationPath(to));
			}.bind(this);

			var del = function (dest) {
				this.fs.delete(this.destinationPath(dest));
			}.bind(this);

			// Copy the template files
			this.fs.copyTpl(this.templatePath() + '/**', this.destinationPath(), tpl);

			// Rename the files
			mv('_package.json', 'package.json');
			mv('travis.yml', '.travis.yml');
			mv('gitignore', '.gitignore');
			mv('gitattributes', '.gitattributes');
			mv('editorconfig', '.editorconfig');

			// We are done!
			done();
		}.bind(this));
	},
	install: function () {
		// Install node dependencies
		this.installDependencies({bower: false});
	}
});
