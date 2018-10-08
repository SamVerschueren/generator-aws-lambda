import {Context} from '../entities';

<% if (generateDocs) { %>/**
 * @api {get} hello Test message
 * @apiName Hello
 * @apiGroup private
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     world
 */<% } %>
export const exec = (ctx: Context) => {
	ctx.body = 'world';
};
