import { WalletFormComponent } from './../wallet-form/wallet-form.component';
import { Wallet } from '../../model/wallet.interface';
import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from 'src/app/service/database.service';
import { withLatestFrom } from 'rxjs/internal/operators/withLatestFrom';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-wallet',
	templateUrl: './wallet.component.html',
	styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
	constructor(private databaseService: DatabaseService) {}
	@Input()
	public wallet: Wallet;
	ű;

	ngOnInit() {}

	public delete($event) {
		this.databaseService.walletDeleter.next(this.wallet);
	}
	public modify($event) {}
}
