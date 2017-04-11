'use strict';
const pify = require('aws-lambda-pify');
require('./env');
const index = require('../../');

module.exports = (test, method, path) => {
	const options = {
		'http-method': method,
		'resource-path': path,
		'identity': {},
		'body': {},
		'params': {},
		'query': {}
	};

	test.before(() => {
		// run setup script
	});

	test.after(() => {
		// clean up resources
	});

	test.beforeEach(t => {
		t.context.fn = opts => pify(index.handler)(Object.assign({}, options, opts));
	});
};
