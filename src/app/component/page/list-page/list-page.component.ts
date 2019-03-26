import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-list-page',
	templateUrl: './list-page.component.html',
	styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
	constructor() {}
	myControl = new FormControl();
	categoryOptions: string[] = ['Bevásárlás', 'Számlák', 'Programok'];
	subcategoryOptions: string[] = ['Élelmiszer', 'Gázszámla', 'Mozi'];
	maxDate = new Date();

	ngOnInit() {}
}
