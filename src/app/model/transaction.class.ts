import * as moment from 'moment';
import { Moment } from 'moment';

export class Transaction {
	constructor(public amount: number, public name: string, public date: Moment) {}
}
