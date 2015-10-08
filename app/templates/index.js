'use strict';

/**
 * <%= functionDescription %>
 *
 * @author <%= name %>      <<%= email %>>
 * @since  <%= date %>
 */

// module dependencies
var AWS = require('aws-sdk');<% if (invoke) { %>
var lambda = require('aws-lambda-invoke')(AWS); <% } %><% if (env) { %>
var environment = require('aws-lambda-env');

var env = environment() || 'production';<% } %>

/**
 * The handler function.
 *
 * @param {object}  req			The data regarding the request.
 * @param {object}  context		The AWS Lambda execution context.
 */
exports.handler = function(req, context) {
	context.succeed(req);
};
