import { WalletService } from 'src/app/service/wallet.service';
import { WalletPageComponent } from './../page/wallet-page/wallet-page.component';
import { Wallet } from '../../model/wallet.interface';
import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from 'src/app/service/database.service';
import { Observable, combineLatest, from } from 'rxjs';
import { RxDocument } from 'rxdb';
import { Transaction } from 'src/app/model/transaction.class';
import { map, tap, flatMap, toArray, filter } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PaymentToBankaccountDialogComponent } from '../dialog/payment-to-bankaccount-dialog/payment-to-bankaccount-dialog.component';
import * as moment from 'moment';

@Component({
	selector: 'app-wallet',
	templateUrl: './wallet.component.html',
	styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
	public transactionsReplayed$: Observable<RxDocument<Transaction>[]>;
	public walletsReplayed$: Observable<RxDocument<Wallet>[]>;
	public otherWallets$: Observable<RxDocument<Wallet>[]>;

	constructor(
		private databaseService: DatabaseService,
		private walletPageComponent: WalletPageComponent,
		public walletService: WalletService,
		public dialog: MatDialog
	) {
		this.transactionsReplayed$ = databaseService.transactionsReplayed$;
		this.walletsReplayed$ = databaseService.walletsReplayed$;
	}
	@Input()
	public walletWithTransaction: { wallet: RxDocument<Wallet>; transactions: RxDocument<Transaction>[] };

	ngOnInit() {}

	public delete($event: MouseEvent) {
		$event.stopPropagation();
		this.databaseService.walletDeleter.next(this.walletWithTransaction.wallet);
		const targetToSave: Transaction = {
			id: '',
			name: '',
			type: 'Bevétel',
			walletRef: '1',
			category: '',
			subcategory: '',
			amount: this.walletService.sum(this.walletWithTransaction.transactions),
			date: moment.now(),
			transfer: true,
			target: ''
		};
		this.databaseService.transactionSaver.next(targetToSave);
	}
	public modify($event) {
		if (this.walletWithTransaction.wallet.name !== 'Készpénz') {
			this.walletPageComponent.walletForm.patchValue({
				wallet: this.walletWithTransaction.wallet.toJSON()
			});
		}
	}

	public balanceFormatter(params) {
		return (
			Math.floor(params)
				.toString()
				.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' Ft'
		);
	}

	public openCashDialog() {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data = {
			id: this.walletWithTransaction.wallet.id
		};
		const dialogRef = this.dialog.open(PaymentToBankaccountDialogComponent, dialogConfig);
		const transactionToSave: Transaction = {
			id: '',
			name: '',
			type: 'Kiadás',
			walletRef: this.walletWithTransaction.wallet.id,
			category: '',
			subcategory: '',
			amount: null,
			date: moment.now(),
			transfer: true,
			target: ''
		};
		const targetToSave: Transaction = {
			id: '',
			name: '',
			type: 'Bevétel',
			walletRef: '',
			category: '',
			subcategory: '',
			amount: null,
			date: moment.now(),
			transfer: true,
			target: ''
		};

		dialogRef.afterClosed().subscribe(result => {
			if (result !== undefined) {
				transactionToSave.target = result.dialogWalletRef;
				transactionToSave.amount = result.dialogAmount;
				targetToSave.walletRef = result.dialogWalletRef;
				targetToSave.amount = result.dialogAmount;

				this.databaseService.transactionSaver.next(transactionToSave);
				targetToSave.id = String(Number(transactionToSave.id) + 1);
				this.databaseService.transactionSaver.next(targetToSave);
			}
		});
	}
}
