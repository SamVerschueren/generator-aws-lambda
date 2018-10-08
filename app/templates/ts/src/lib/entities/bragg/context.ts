import {Request} from './request';
import {Config} from './config';

export interface Context {
	config: Config;
	request: Request;
	status: number;
	body: any;
	throw(statusCode: number, message?: string): void;
}
