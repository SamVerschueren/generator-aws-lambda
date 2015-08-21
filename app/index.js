'use strict';

/**
 * Yeoman generator for AWS Lambda functions in NodeJS.
 * 
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  21 Aug. 2015
 */

// module dependencies
var yeoman = require('yeoman-generator'),
    moment = require('moment');

module.exports = yeoman.generators.Base.extend({
    init: function() {
        var done = this.async();
        
        this.prompt([
            {
                name: 'functionName',
                message: 'What do you want to name your lambda function?'
            },
            {
                name: 'functionDescription',
                message: 'What\'s the purpose of the function?'
            },
            {
                name: 'githubUsername',
                message: 'What is your GitHub username?',
			    store: true,
                validate: function (val) {
                    return val.length > 0 ? true : 'You have to provide a username';
                }
            }
        ], function(props) {
            var tpl = {
                functionName: props.functionName,
                functionDescription: props.functionDescription,
                name: this.user.git.name(),
                email: this.user.git.email(),
                date: moment().format('DD MMM. YYYY')
            };
            
            this.fs.copyTpl([this.templatePath() + '/**'], this.destinationPath(), tpl);
            
            done();
        }.bind(this));
    }
});