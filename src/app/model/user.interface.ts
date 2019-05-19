import { BrowserModule } from '@angular/platform-browser';
import { RxJsonSchema } from 'rxdb';

export interface User {
	id: string;
	name: string;
}

export const userSchema: RxJsonSchema = {
	title: 'User',
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
		}
	}
};
