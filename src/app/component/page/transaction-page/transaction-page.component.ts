import { transition } from '@angular/animations';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { TransactionListComponent } from '../../transaction-list/transaction-list.component';
import { Transaction } from 'src/app/model/transaction.class';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/service/database.service';
import { TransactionFormComponent } from '../../transaction-form/transaction-form.component';
import * as moment from 'moment';
import { RxDocument } from 'rxdb';
import { Wallet } from 'src/app/model/wallet.interface';
import { WalletService } from 'src/app/service/wallet.service';
import { map, filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-transaction-list-page',
	templateUrl: './transaction-page.component.html',
	styleUrls: ['./transaction-page.component.scss']
})
export class TransactionPageComponent implements OnInit {
	public transactions$: Observable<Transaction[]>;
	public walletAmount: number;

	constructor(
		private snackBar: MatSnackBar,
		private databaseService: DatabaseService,
		private formBuilder: FormBuilder,
		public walletService: WalletService
	) {
		this.transactions$ = this.databaseService.transactions$;
	}

	public transactionForm = this.formBuilder.group({});
	@ViewChild('transactionForm')
	transactionFormComponent: TransactionFormComponent;

	public walletsWithTransactions$: Observable<
		{ wallet: RxDocument<Wallet>; transactions: RxDocument<Transaction>[] }[]
	>;

	ngOnInit() {}

	save() {
		const transactionToSave = this.transactionForm.value.transaction as Transaction;
		transactionToSave.date = moment(this.transactionForm.value.transaction.date).unix();
		transactionToSave.target = '';
		transactionToSave.transfer = false;

		this.databaseService.transactionsReplayed$
			.pipe(map(t => t.filter(t => t.walletRef === transactionToSave.walletRef)))
			.subscribe(t => {
				this.walletAmount = this.walletService.sum(t);
			});

		if (this.walletAmount < transactionToSave.amount && transactionToSave.type === 'Kiadás') {
			this.snackBar.open('Az átutaló tárca egyenlege negatív lett!', '', {
				duration: 5000,
				panelClass: ['snackbar']
			});
		}

		this.databaseService.transactionSaver.next(transactionToSave);
		this.transactionForm.reset();
	}
}
