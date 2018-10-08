/**
 * Error handler
 *
 * @param	ctx			The bragg context object.
 */
export const errorHandler = ctx => {
	if (ctx.body === undefined && (ctx.status === undefined || ctx.status >= 400)) {
		// If the body is undefined, throw a 404
		ctx.throw(ctx.status || 404);
	}
};
