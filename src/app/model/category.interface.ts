import { Category } from './category.interface';
import { BrowserModule } from '@angular/platform-browser';
import { RxJsonSchema } from 'rxdb';

export interface Category {
	name: string;
	subcategories: string[];
}

export const categorySchema: RxJsonSchema = {
	title: 'Category',
	description: '',
	version: 0,
	keyCompression: true,
	type: 'object',
	properties: {
		name: {
			type: 'string',
			primary: true
		},
		subcategories: {
			type: 'string'
		}
	}
};
