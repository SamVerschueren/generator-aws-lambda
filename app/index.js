'use strict';

/**
 * Yeoman generator for AWS Lambda functions in NodeJS.
 * 
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  21 Aug. 2015
 */

// module dependencies
var path = require('path'),
    yeoman = require('yeoman-generator'),
    moment = require('moment'),
    uppercamelcase = require('uppercamelcase');

module.exports = yeoman.generators.Base.extend({
    init: function() {
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
                name: 'githubUsername',
                message: 'What is your GitHub username?',
                store: true,
                validate: function (val) {
                    return val.length > 0 ? true : 'You have to provide a username';
                }
            },
            {
                name: 'invoke',
                message: 'Do you need want to invoke other lambda functions?',
                type: 'confirm',
                default: true
            }
        ], function(props) {
            // Build up the template
            var tpl = {
                functionName: props.functionName,
                functionDescription: props.functionDescription,
                name: this.user.git.name(),
                email: this.user.git.email(),
                invoke: props.invoke,
                date: moment().format('DD MMM. YYYY')
            };
            
            var mv = function (from, to) {
                this.fs.move(this.destinationPath(from), this.destinationPath(to));
            }.bind(this);
            
            // Copy the template files
            this.fs.copyTpl(this.templatePath() + '/**', this.destinationPath(), tpl);
            
            // Rename the files
            mv('_package.json', 'package.json');
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