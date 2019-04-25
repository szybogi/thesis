import { Wallet } from './../../model/wallet.interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-bank-account',
	templateUrl: './bank-account.component.html',
	styleUrls: ['./bank-account.component.scss']
})
export class BankAccountComponent implements OnInit {
	@Input()
	public wallet: Wallet;

	constructor() {}
	private balences: number;
	balances = 200000;
	ngOnInit() {}
}
