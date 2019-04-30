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
	constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService) {
		this.wallets$ = this.databaseService.wallets$;
	}

	@Input()
	parent: FormGroup;

	transaction: FormGroup;
	ngOnInit(): void {
		this.transaction = this.formBuilder.group({
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
}