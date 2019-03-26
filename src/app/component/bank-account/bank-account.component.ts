import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-bank-account',
	templateUrl: './bank-account.component.html',
	styleUrls: ['./bank-account.component.scss']
})
export class BankAccountComponent implements OnInit {
	constructor() {}
	private balences: number;
	balances = 200000;
	ngOnInit() {}
}
