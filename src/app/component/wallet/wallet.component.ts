import { WalletPageComponent } from './../page/wallet-page/wallet-page.component';
import { Wallet } from '../../model/wallet.interface';
import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from 'src/app/service/database.service';
import { Observable, combineLatest } from 'rxjs';
import { RxDocument } from 'rxdb';
import { Transaction } from 'src/app/model/transaction.class';

@Component({
	selector: 'app-wallet',
	templateUrl: './wallet.component.html',
	styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
	public transactionsReplayed$: Observable<RxDocument<Transaction>[]>;
	public walletsReplayed$: Observable<RxDocument<Wallet>[]>;
	constructor(private databaseService: DatabaseService, private walletPageComponent: WalletPageComponent) {
		this.transactionsReplayed$ = databaseService.transactionsReplayed$;
		this.walletsReplayed$ = databaseService.walletsReplayed$;
	}
	@Input()
	public wallet: RxDocument<Wallet>;

	ngOnInit() {}

	public delete($event: MouseEvent) {
		$event.stopPropagation();
		this.databaseService.walletDeleter.next(this.wallet);
	}
	public modify($event) {
		if (this.wallet.name !== 'Készpénz') {
			this.walletPageComponent.walletForm.patchValue({
				wallet: this.wallet.toJSON()
			});
		}
	}
}
