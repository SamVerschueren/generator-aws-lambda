import * as pify from 'aws-lambda-pify';
import * as invoke from 'bragg-route-invoke';
import './env';

const cwd = process.cwd();

export function bootstrap(test: any, method: string, path: string) {
	process.chdir(cwd);

	const options = {
		'http-method': method,
		'resource-path': path,
		identity: {},
		body: {},
		params: {},
		query: {}
	};

	test.before(() => {
		// Run setup script
	});

	test.after(() => {
		// Clean up resources
	});

	test.beforeEach(t => {
		t.context.fn = args => {
			const index = require('../..');
			return pify(index.handler)(Object.assign({}, options, args));
		};
	});
}
