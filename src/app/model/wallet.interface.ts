import { BrowserModule } from '@angular/platform-browser';
import { RxJsonSchema } from 'rxdb';

export interface Wallet {
	id: string;
	name: string;
	individual: string;
	otherOwner: string;
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
