'use strict';

/**
 * <%= functionDescription %>
 *
 * @author <%= name %>      <<%= email %>>
 * @since  <%= date %>
 */

// module dependencies
var AWS = require('aws-sdk')<% if (invoke) { %>,
    lambda = require('aws-lambda-invoke')(AWS)<% } %><% if (env) { %>,
    env = require('aws-lambda-env')() || 'production'<% } %>;

/**
 * The handler function.
 *
 * @param {object}  event       The data regarding the event.
 * @param {object}  context     The AWS Lambda execution context.
 */
exports.handler = function(event, context) {
    context.succeed();
};