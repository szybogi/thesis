import { filter, map, distinct, flatMap, tap, shareReplay } from 'rxjs/operators';
import { Transaction } from 'src/app/model/transaction.class';
import { Moment } from 'moment';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/service/database.service';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Wallet } from 'src/app/model/wallet.interface';

@Component({
	selector: 'app-transaction-form',
	templateUrl: './transaction-form.component.html',
	styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
	public wallets$: Observable<Wallet[]>;
	public transactionsCategory$: Observable<string[]>;
	public transactionsSubcategory$: Observable<Transaction[]>;
	constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService) {
		this.wallets$ = this.databaseService.walletsReplayed$;
		this.transactionsCategory$ = this.databaseService.transactionsReplayed$.pipe(
			map(transactions =>
				transactions
					.filter(t => t.category !== undefined && t.category !== '')
					.map(t => t.category)
					.reduce((acc, next) => {
						if (acc.includes(next)) {
							return acc;
						} else {
							acc.push(next);
							return acc;
						}
					}, [])
			),
			tap(c => console.log(c)),
			shareReplay(1)
		);
	}

	@Input()
	parent: FormGroup;

	transaction: FormGroup;
	ngOnInit(): void {
		this.transaction = this.formBuilder.group({
			id: ['', []],
			name: ['', [Validators.required]],
			walletRef: ['', [Validators.required]],
			type: ['', [Validators.required]],
			category: ['', [Validators.required]],
			subcategory: ['', [Validators.required]],
			date: ['', [Validators.required]],
			amount: [null, [Validators.required, Validators.min(1)]],
			target: ['', []],
			transfer: [false, []]
		});

		this.parent.addControl('transaction', this.transaction);
	}

	get isIdDefined() {
		return this.transaction.controls.id.value === '' || this.transaction.controls.id.value === null;
	}
}
