'use strict';
const bragg = require('bragg');
const braggRouter = require('bragg-router');
const environment = require('bragg-env');<% if (includeDynongo) { %>
const db = require('dynongo');<% } %>
const errorHandler = require('./lib/error-handler');
const config = require('./config.json');

// Controllers
const hello = require('./lib/controllers/hello');

// Create all the routes
function routes() {
	const router = braggRouter();

	// @public
	// public routes

	// @private
	router.get('hello', hello);

	return router.routes();
}

// Create app and bootstrap middleware
const app = bragg();
app.use(environment());
app.use(ctx => {
	ctx.config = config[ctx.env];<% if (includeDynongo) { %>
	db.connect(ctx.config.DynamoDB);<% } %>
});
app.use(routes());
app.use(errorHandler);

// Listen for requests
exports.handler = app.listen();
