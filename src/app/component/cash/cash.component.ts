import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-cash',
	templateUrl: './cash.component.html',
	styleUrls: ['./cash.component.scss']
})
export class CashComponent implements OnInit {
	constructor() {}
	private balences: number;
	balances = 100000;

	ngOnInit() {}
}
