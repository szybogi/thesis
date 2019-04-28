import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-transaction-list-page',
	templateUrl: './transaction-page.component.html',
	styleUrls: ['./transaction-page.component.scss']
})
export class TransactionPageComponent implements OnInit {
	constructor() {}
	myControl = new FormControl();
	categoryOptions: string[] = ['Bevásárlás', 'Számlák', 'Programok'];
	subcategoryOptions: string[] = ['Élelmiszer', 'Gázszámla', 'Mozi'];
	maxDate = new Date();

	ngOnInit() {}
}
