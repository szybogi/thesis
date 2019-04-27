import { Wallet } from '../../model/wallet.interface';
import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from 'src/app/service/database.service';

@Component({
	selector: 'app-wallet',
	templateUrl: './wallet.component.html',
	styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
	@Input()
	public wallet: Wallet;

	constructor(private databaseService: DatabaseService) {}

	ngOnInit() {}

	public delete($event) {
		this.databaseService.walletDeleter.next(this.wallet);
	}
}
