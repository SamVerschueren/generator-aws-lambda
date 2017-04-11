'use strict';

/**
 * Error handler
 *
 * @param {Object}	ctx			The bragg context object.
 */
module.exports = ctx => {
	if (ctx.body === undefined) {
		// If the body is undefined, throw a 404
		ctx.throw(404);
	}
};
