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

module.exports = yeoman.generators.Base.extend({
	init: function () {
		var done = this.async();

		// Ask the questions
		this.prompt([
			{
				name: 'functionName',
				message: 'What do you want to name your lambda function?',
				default: uppercamelcase(process.cwd().split(path.sep).pop())
			},
			{
				name: 'functionDescription',
				message: 'What\'s the description of the lambda function?',
				validate: function (val) {
					return val.length > 0 ? true : 'You have to provide a description';
				}
			},
			{
				name: 'keywords',
				message: 'Provide a list of keywords?',
				filter: function (keywords) {
					return keywords.replace(/,? /g, ',').split(',');
				}
			},
			{
				name: 'githubUsername',
				message: 'Wha\'s your GitHub username?',
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
				message: 'Do you want to invoke other lambda functions?',
				type: 'confirm',
				default: true
			},
			{
				name: 'env',
				message: 'Do you want to extract the environment from the function name?',
				type: 'confirm',
				default: true
			}
		], function (props) {
			// Build the list of dependencies
			var dependencies = {};
			if (props.invoke) {
				dependencies['aws-lambda-invoke'] = '^1.0.6';
			}
			if (props.env) {
				dependencies['aws-lambda-env'] = '^1.1.0';
			}

			// Build up the template
			var tpl = {
				functionName: props.functionName,
				functionDescription: props.functionDescription,
				keywords: props.keywords,
				name: props.name || this.user.git.name(),
				email: props.email || this.user.git.email(),
				invoke: props.invoke,
				env: props.env,
				dependencies: dependencies,
				date: moment().format('DD MMM. YYYY')
			};

			var mv = function (from, to) {
				this.fs.move(this.destinationPath(from), this.destinationPath(to));
			}.bind(this);

			// Copy the template files
			this.fs.copyTpl(this.templatePath() + '/**', this.destinationPath(), tpl);

			// Rename the files
			mv('_package.json', 'package.json');
			mv('travis.yml', '.travis.yml');
			mv('gitignore', '.gitignore');

			// We are done!
			done();
		}.bind(this));
	},
	install: function () {
		// Install node dependencies
		this.installDependencies({bower: false});
	}
});
