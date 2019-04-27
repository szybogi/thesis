import { BrowserModule } from '@angular/platform-browser';
import { RxJsonSchema } from 'rxdb';

export interface Wallet {
	owner: string;
	name: string;
	individual: boolean;
	otherOwner: string;
	balance: number;
}

export const walletSchema: RxJsonSchema = {
	title: 'Wallet',
	description: '',
	version: 0,
	keyCompression: true,
	type: 'object',
	properties: {
		owner: {
			type: 'string'
		},
		name: {
			type: 'string',
			primary: true
		},
		individual: {
			type: 'boolean'
		},
		otherOwner: {
			type: 'string'
		}
	}
};
