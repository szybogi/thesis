import { DatabaseService } from './../../../service/database.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Wallet } from 'src/app/model/wallet.interface';
import { map, switchMap } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'app-wallet-page',
	templateUrl: './wallet-page.component.html',
	styleUrls: ['./wallet-page.component.scss']
})
export class WalletPageComponent implements OnInit {
	public wallets$: Observable<Wallet[]>;

	constructor(private databaseService: DatabaseService) {
		this.wallets$ = databaseService.database$.pipe(switchMap(db => db.wallet.find().$));
	}

	ngOnInit() {}
}
