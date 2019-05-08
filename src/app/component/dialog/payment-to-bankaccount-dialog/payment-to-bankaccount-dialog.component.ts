import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RxDocument } from 'rxdb';
import { Wallet } from 'src/app/model/wallet.interface';
import { Transaction } from 'src/app/model/transaction.class';
import { DatabaseService } from 'src/app/service/database.service';
import { Observable, from } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WalletService } from 'src/app/service/wallet.service';
import { toArray, map, flatMap, shareReplay } from 'rxjs/operators';

@Component({
	selector: 'app-payment-to-bankaccount-dialog',
	templateUrl: './payment-to-bankaccount-dialog.component.html',
	styleUrls: ['./payment-to-bankaccount-dialog.component.scss']
})
export class PaymentToBankaccountDialogComponent implements OnInit {
	public walletsReplayed$: Observable<RxDocument<Wallet>[]>;
	public dialogForm: FormGroup;
	public id;
	constructor(
		private fb: FormBuilder,
		public dialogRef: MatDialogRef<PaymentToBankaccountDialogComponent>,
		private databaseService: DatabaseService,
		@Inject(MAT_DIALOG_DATA) data
	) {
		this.id = data.id;
		this.walletsReplayed$ =
			databaseService.walletsReplayed$ /*.pipe(
			flatMap(wallets => wallets),
			map(wallet => {
				if (wallet.id !== data.id) {
					return wallet;
				}
			}),
			toArray(),
			shareReplay(1)
		)*/;
	}
	@Input()
	public walletWithTransaction: { wallet: RxDocument<Wallet>; transactions: RxDocument<Transaction>[] };

	ngOnInit() {
		this.dialogForm = this.fb.group({
			dialogWalletRef: ['', [Validators.required]],
			dialogAmount: [null, [Validators.required, Validators.min(1)]]
		});
	}

	save() {
		this.dialogRef.close(this.dialogForm.value);
	}

	close() {
		this.dialogRef.close();
	}
}
