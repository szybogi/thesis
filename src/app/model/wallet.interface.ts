import { BrowserModule } from '@angular/platform-browser';
import { RxJsonSchema } from 'rxdb';

export interface Wallet {
	id: string;
	owner: string;
	name: string;
	individual: string;
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
		id: {
			type: 'string',
			primary: true
		},
		owner: {
			type: 'string'
		},
		name: {
			type: 'string'
		},
		individual: {
			type: 'string'
		},
		otherOwner: {
			type: 'string'
		}
	}
};
