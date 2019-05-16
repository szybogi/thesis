import { transition } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { TransactionListComponent } from '../../transaction-list/transaction-list.component';
import { Transaction } from 'src/app/model/transaction.class';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/service/database.service';
import { TransactionFormComponent } from '../../transaction-form/transaction-form.component';
import * as moment from 'moment';

@Component({
	selector: 'app-transaction-list-page',
	templateUrl: './transaction-page.component.html',
	styleUrls: ['./transaction-page.component.scss']
})
export class TransactionPageComponent implements OnInit {
	public transactions$: Observable<Transaction[]>;

	constructor(private databaseService: DatabaseService, private formBuilder: FormBuilder) {
		this.transactions$ = this.databaseService.transactions$;
	}

	public transactionForm = this.formBuilder.group({});
	@ViewChild('transactionForm')
	transactionFormComponent: TransactionFormComponent;

	ngOnInit() {}

	save() {
		const transactionToSave = this.transactionForm.value.transaction as Transaction;
		transactionToSave.date = moment(this.transactionForm.value.transaction.date).unix();
		transactionToSave.target = '';
		transactionToSave.transfer = false;
		this.databaseService.transactionSaver.next(transactionToSave);
		this.transactionForm.reset();
	}
}
