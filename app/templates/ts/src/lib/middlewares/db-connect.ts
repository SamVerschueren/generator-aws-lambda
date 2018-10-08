import * as db from 'dynongo';
import {Context} from '../entities';

export const connect = () => {
	return (ctx: Context) => {
		db.connect({...ctx.config.DynamoDB});
	};
};
