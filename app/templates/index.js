'use strict';

/**
 * <%= functionDescription %>
 *
 * @author <%= name %>      <<%= email %>>
 * @since  <%= date %>
 */

// module dependencies<% if (invoke) { %>
var lambda = require('aws-lambda-invoke');<% } %><% if (includePinkiePromise) { %>
var Promise = require('pinkie-promise');<% } %><% if (includePify) { %>
var pify = require('pify');<% } %><% if (includeDynongo) { %>
var db = require('dynongo');<% } %><% if (env) { %>
var environment = require('aws-lambda-env');

var env = environment() || 'production';
var config = require('./config.json')[env];<% } %>

/**
 * The handler function.
 *
 * @param {object}  req			The data regarding the request.
 * @param {object}  context		The AWS Lambda execution context.
 */
exports.handler = function (req, context) {
	context.succeed(req);
};
