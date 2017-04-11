'use strict';
<% if (generateDocs) { %>
/**
 * @api {get} hello Test message
 * @apiName Hello
 * @apiGroup private
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     world
 */<% } %>
module.exports = ctx => {
	ctx.body = 'world';
};
