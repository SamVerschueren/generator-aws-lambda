import * as bragg from 'bragg';
import * as braggRouter from 'bragg-router';
import * as environment from 'bragg-env';
import * as loadConfig from 'bragg-load-config';

import {errorHandler} from './lib/error-handler';<% if (includeDynongo) { %>
import {connect} from './lib/middlewares/db-connect';<% } %>

// Controllers
import * as hello from './lib/controllers/hello';

// Create all the routes
const routes = () => {
	const router = braggRouter();

	// @public
	// Public routes

	// @private
	router.get('hello', hello.exec);

	return router.routes();
};

// Create app and bootstrap middleware
const app = bragg();
app.use(environment());
app.use(loadConfig('config.json', {cwd: __dirname}));<% if (includeDynongo) { %>
app.use(connect());<% } %>
app.use(routes());
app.use(errorHandler);

// Listen for requests
export const handler = app.listen();
