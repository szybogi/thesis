import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/model/transaction.class';
import * as moment from 'moment';

@Component({
	selector: 'app-transaction',
	templateUrl: './transaction.component.html',
	styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
	@Input() transaction: Transaction;

	constructor() {}

	get isPositive(): boolean {
		return this.transaction.amount >= 0;
	}

	ngOnInit() {}
}
