import { BrowserModule } from '@angular/platform-browser';
import { RxJsonSchema } from 'rxdb';
export interface Lockup {
	id: string;
	name: string;
	walletRef: string;
	interest: number;
	amount: number;
	start: number;
	end: number;
	status: string;
}

export const lockupSchema: RxJsonSchema = {
	title: 'Lockup',
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
		walletRef: {
			type: 'string'
		},
		interest: {
			type: 'number'
		},
		start: {
			type: 'number'
		},
		end: {
			type: 'number'
		},
		amount: {
			type: 'number'
		},
		status: {
			type: 'string'
		}
	}
};
