'use strict';
const path = require('path');
const yeoman = require('yeoman-generator');
const moment = require('moment');
const uppercamelcase = require('uppercamelcase');
const _s = require('underscore.string');

const features = {
	dynongo: '^0.12.0',
	pify: '^2.3.0'
};

const featuresList = Object.keys(features);

module.exports = class extends yeoman.Base {

	init() {
		const featurePrompt = {
			name: 'features',
			message: 'What more would you like?',
			type: 'checkbox',
			choices: featuresList.map(feature => ({name: feature, value: feature}))
		};

		// Ask the questions
		return this.prompt([
			{
				name: 'functionName',
				message: 'What\'s the name of your service?',
				default: this.appname.replace(/\s/g, '-'),
				filter: x => _s.slugify(x)
			},
			{
				name: 'functionDescription',
				message: 'What\'s the description of the service?',
				validate: val => val.length > 0 ? true : 'You have to provide a description'
			},
			{
				name: 'keywords',
				message: 'Provide a list of keywords (comma- or space-separated)?',
				filter: keywords => keywords.replace(/,? /g, ',').split(',')
			},
			{
				name: 'githubUsername',
				message: 'What\'s your GitHub username?',
				store: true,
				filter: username => username.trim()
			},
			{
				name: 'name',
				message: 'What\'s your name?',
				store: true,
				when: props => props.githubUsername.length === 0,
				validate: val => val.length > 0 ? true : 'You have to provide your name'
			},
			{
				name: 'email',
				message: 'What\'s your email address?',
				store: true,
				when: props => props.githubUsername.length === 0,
				validate: val => val.length > 0 ? true : 'You have to provide your email address'
			},
			{
				name: 'typescript',
				message: 'Do you want to use TypeScript?',
				type: 'confirm',
				default: false
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
		]).then(props => {
			// Build the list of dependencies
			const dependencies = {};
			if (props.invoke) {
				dependencies['bragg-route-invoke'] = '^1.0.2';
			}

			// Build up the template
			const tpl = {
				functionName: props.functionName,
				functionDescription: props.functionDescription,
				keywords: props.keywords,
				name: props.name || this.user.git.name(),
				email: props.email || this.user.git.email(),
				invoke: props.invoke,
				generateDocs: props.docs,
				dependencies,
				date: moment().format('DD MMM. YYYY')
			};

			const templatePath = path.join(this.templatePath(), props.typescript ? 'ts' : 'js', '**');

			for (const feature of featuresList) {
				const hasFeature = props.features.indexOf(feature) !== -1;

				if (hasFeature) {
					tpl.dependencies[feature] = features[feature];
				}

				tpl['include' + uppercamelcase(feature)] = hasFeature;
			}

			const mv = (from, to) => {
				this.fs.move(this.destinationPath(from), this.destinationPath(to));
			};

			// Copy the template files
			this.fs.copyTpl(templatePath, this.destinationPath(), tpl);

			// Rename the files
			mv('_package.json', 'package.json');
			mv('travis.yml', '.travis.yml');
			mv('gitignore', '.gitignore');
			mv('gitattributes', '.gitattributes');
			mv('editorconfig', '.editorconfig');
		});
	}

	install() {
		// Install node dependencies
		this.installDependencies({bower: false});
	}
};
