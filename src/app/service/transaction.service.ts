import { Injectable } from '@angular/core';
import { Transaction } from '../model/transaction.class';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class TransactionService {
	transactions: Array<Transaction> = [
		new Transaction(
			'Havi munkabér',
			'Bankkártya1',
			'Bevétel',
			'Munkabér',
			'Rendszeres juttatás',
			moment('2019-03-03').unix(),
			200000
		),
		new Transaction(
			'Vízszámla',
			'Bankkártya1',
			'Kiadás',
			'Számlák',
			'Rendszeres kiadás',
			moment('2019-03-03').unix(),
			20000
		),
		new Transaction('Kenyér', 'Készpénz', 'Kiadás', 'Bevásárlás', 'Élelmiszer', moment('2019-03-03').unix(), 260)
	];
	constructor() {}
}
