import * as moment from 'moment';
import { Moment } from 'moment';

export class Transaction {
	constructor(
		public name: string,
		public wallet: string,
		public type: string,
		public category: string,
		public subcategory: string,
		public date: Moment,
		public amount: number
	) {}
}
