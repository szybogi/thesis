import { WalletFormComponent } from '../../wallet-form/wallet-form.component';
import { DatabaseService } from './../../../service/database.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Wallet } from 'src/app/model/wallet.interface';
import { map, switchMap, tap } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-wallet-page',
	templateUrl: './wallet-page.component.html',
	styleUrls: ['./wallet-page.component.scss']
})
export class WalletPageComponent implements OnInit {
	public wallets$: Observable<Wallet[]>;

	constructor(private databaseService: DatabaseService, private formBuilder: FormBuilder) {
		this.wallets$ = this.databaseService.wallets$;
	}

	public walletForm = this.formBuilder.group({});
	@ViewChild('walletForm')
	walletFormComponent: WalletFormComponent;

	ngOnInit() {}

	save() {
		// ? Because the conditional field only gets hidden and not removed, it's advised to clear all fields that should not be there
		const walletToSave = this.walletForm.value.wallet as Wallet;
		if (walletToSave.individual === 'unique') {
			walletToSave.otherOwner = undefined;
		}
		this.databaseService.walletSaver.next(walletToSave);
		this.walletForm.reset();
	}
}
