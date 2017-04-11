import * as path from 'path';
import * as bragg from 'bragg';
import * as braggRouter from 'bragg-router';
import * as environment from 'bragg-env';
import * as loadJsonFile from 'load-json-file';<% if (includeDynongo) { %>
import * as db from 'dynongo';<% } %>
import { errorHandler } from './lib/error-handler';

// Controllers
import * as hello from './lib/controllers/hello';

// Create all the routes
function routes() {
	const router = braggRouter();

	// @public
	// Public routes

	// @private
	router.get('hello', hello.exec);

	return router.routes();
}

// Create app and bootstrap middleware
const app = bragg();
app.use(environment());
app.use(ctx => {
	const config = loadJsonFile.sync(path.join(__dirname, 'config.json'));
	ctx.config = config[ctx.env];<% if (includeDynongo) { %>
	db.connect(ctx.config.DynamoDB);<% } %>
});
app.use(routes());
app.use(errorHandler);

// Listen for requests
export const handler = app.listen();
