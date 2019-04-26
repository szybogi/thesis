import * as moment from 'moment';
import { Moment } from 'moment';
import { RxJsonSchema } from 'rxdb';
import { Wallet } from './wallet.interface';

export class Transaction {
	constructor(
		public name: string,
		public walletRef: string,
		public type: string,
		public category: string,
		public subcategory: string,
		public date: number,
		public amount: number
	) {}
}

export const transactionSchema: RxJsonSchema = {
	title: 'Transaction',
	description: '',
	version: 0,
	keyCompression: true,
	type: 'object',
	properties: {
		name: {
			type: 'string'
		},
		walletRef: {
			type: 'string'
		},
		type: {
			type: 'string'
		},
		category: {
			type: 'string'
		},
		subcategory: {
			type: 'string'
		},
		date: {
			type: 'number'
		},
		amount: {
			type: 'number'
		}
	}
};
