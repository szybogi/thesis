import { FormBuilder, FormControl } from '@angular/forms';
import { WalletPageComponent } from './../page/wallet-page/wallet-page.component';
import { WalletFormComponent } from './../wallet-form/wallet-form.component';
import { Wallet, walletSchema } from '../../model/wallet.interface';
import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from 'src/app/service/database.service';
import { withLatestFrom } from 'rxjs/internal/operators/withLatestFrom';
import { Observable } from 'rxjs';
import { RxDocument } from 'rxdb';

@Component({
	selector: 'app-wallet',
	templateUrl: './wallet.component.html',
	styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
	constructor(private databaseService: DatabaseService, private walletPageComponent: WalletPageComponent) {}
	@Input()
	public wallet: RxDocument<Wallet>;

	ngOnInit() {}

	public delete($event) {
		this.databaseService.walletDeleter.next(this.wallet);
	}
	public modify($event) {
		this.walletPageComponent.walletForm.patchValue({
			wallet: this.wallet.toJSON()
		});
	}
}
