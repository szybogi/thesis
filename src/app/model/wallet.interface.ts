import { RxJsonSchema } from 'rxdb';

export interface Wallet {
	name: string;
}

export const walletSchema: RxJsonSchema = {
	title: 'Wallet',
	description: '',
	version: 0,
	keyCompression: true,
	type: 'object',
	properties: {
		name: {
			type: 'string',
			primary: true
		}
	}
};
