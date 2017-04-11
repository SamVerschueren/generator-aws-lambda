<% if (generateDocs) { %>/**
 * @api {get} hello Test message
 * @apiName Hello
 * @apiGroup private
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     world
 */<% } %>
export function exec(ctx: any) {
	ctx.body = 'world';
}
