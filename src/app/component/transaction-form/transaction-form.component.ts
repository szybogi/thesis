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
	public transactions$: Observable<Transaction[]>;
	constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService) {
		this.wallets$ = this.databaseService.walletsReplayed$;
		this.transactions$ = this.databaseService.transactionsReplayed$;
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
			amount: [null, [Validators.required, Validators.min(1)]]
		});

		this.parent.addControl('transaction', this.transaction);
	}

	get isIdDefined() {
		return this.transaction.controls.id.value === '' || this.transaction.controls.id.value === null;
	}
}
