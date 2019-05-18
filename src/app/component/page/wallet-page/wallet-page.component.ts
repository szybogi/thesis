import { WalletFormComponent } from '../../wallet-form/wallet-form.component';
import { DatabaseService } from './../../../service/database.service';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Wallet } from 'src/app/model/wallet.interface';
import { map, switchMap, tap } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { WalletService } from 'src/app/service/wallet.service';
import { RxDocument } from 'rxdb';
import { Transaction } from 'src/app/model/transaction.class';

@Component({
	selector: 'app-wallet-page',
	templateUrl: './wallet-page.component.html',
	styleUrls: ['./wallet-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletPageComponent implements OnInit {
	public walletsWithTransactions$: Observable<
		{ wallet: RxDocument<Wallet>; transactions: RxDocument<Transaction>[] }[]
	>;
	constructor(
		private databaseService: DatabaseService,
		private walletService: WalletService,
		private changeDetector: ChangeDetectorRef,
		private formBuilder: FormBuilder
	) {
		this.walletsWithTransactions$ = this.walletService.walletsWithTransactions$;
	}

	public walletForm = this.formBuilder.group({});
	@ViewChild('walletForm')
	walletFormComponent: WalletFormComponent;

	ngOnInit() {}

	save() {
		const walletToSave = this.walletForm.value.wallet as Wallet;
		if (walletToSave.individual === 'unique') {
			walletToSave.otherOwner = undefined;
		}
		this.databaseService.walletSaver.next(walletToSave);
		this.walletForm.reset();
		this.changeDetector.markForCheck();
	}
}
