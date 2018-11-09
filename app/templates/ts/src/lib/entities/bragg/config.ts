export interface Config {
	DynamoDB?: {
		prefix?: string;
		host: string;
		local?: boolean;
	};
}
