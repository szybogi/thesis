import { Injectable } from '@angular/core';
import { Transaction } from '../model/transaction.class';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class TransactionService {
	transactions: Array<Transaction> = [];
	constructor() {}
}
