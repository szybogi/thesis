import { WalletService } from 'src/app/service/wallet.service';
import { WalletPageComponent } from './../page/wallet-page/wallet-page.component';
import { Wallet } from '../../model/wallet.interface';
import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from 'src/app/service/database.service';
import { Observable, combineLatest, from } from 'rxjs';
import { RxDocument } from 'rxdb';
import { Transaction } from 'src/app/model/transaction.class';
import { map, tap, flatMap, toArray, filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { PaymentToBankaccountDialogComponent } from '../dialog/payment-to-bankaccount-dialog/payment-to-bankaccount-dialog.component';

@Component({
	selector: 'app-wallet',
	templateUrl: './wallet.component.html',
	styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
	public transactionsReplayed$: Observable<RxDocument<Transaction>[]>;
	public walletsReplayed$: Observable<RxDocument<Wallet>[]>;

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
		const dialogRef = this.dialog.open(PaymentToBankaccountDialogComponent);

		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
		});
	}
}
