'use strict';
var bragg = require('bragg');
var Router = require('bragg-router');
var environment = require('bragg-env');<% if (includeDynongo) { %>
var db = require('dynongo');<% } %>
var errorHandler = require('./lib/error-handler');
var config = require('./config.json');

// Create all the routes
function routes() {
	var router = new Router();

	// @public
	// public routes

	// @private
	// private routes

	return router.routes();
}

// Create app and bootstrap middleware
var app = bragg();
app.use(environment());
app.use(function (ctx) {
	ctx.config = config[ctx.env];<% if (includeDynongo) { %>
	db.connect(ctx.config.DynamoDB);<% } %>
});
app.use(routes());
app.use(errorHandler);

// Listen for requests
exports.handler = app.listen();
