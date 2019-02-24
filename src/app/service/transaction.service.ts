import { Injectable } from '@angular/core';
import { Transaction } from '../model/transaction.class';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class TransactionService {
	transactions: Array<Transaction> = [
		new Transaction(1000, 'kenyer', moment('2018-01-01')),
		new Transaction(10000, 'kenyer', moment('2018-01-03')),
		new Transaction(-1000, 'kenyer', moment('2018-01-01')),
		new Transaction(2000, 'kenyer', moment('2018-01-01')),
		new Transaction(1000, 'kenyer', moment('2018-01-01')),
		new Transaction(1000, 'kenyer2', moment('2018-01-01')),
		new Transaction(1000, 'kenyer', moment('2018-01-02')),
		new Transaction(1000, 'kenyer', moment('2018-01-08'))
	];
	constructor() {}
}
