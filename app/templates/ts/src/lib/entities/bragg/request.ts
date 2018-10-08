export interface Request {
	params: {
		[key: string]: string;
	};
	query: {
		[key: string]: string;
	};
	body: any;
}
