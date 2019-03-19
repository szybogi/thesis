import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	constructor(public transactionService: TransactionService) {}

	columnDefs = [
		{ headerName: 'Tranzakció neve', field: 'name' },
		{ headerName: 'Tárca', field: 'wallet' },
		{ headerName: 'Típus', field: 'type', width: 70 },
		{ headerName: 'Kategória', field: 'category' },
		{ headerName: 'Alkategória', field: 'subcategory' },
		{ headerName: 'Összeg', field: 'amount' },
		{ headerName: 'Törlés', field: 'delete', width: 80 }
	];

	rowData = [
		{
			name: 'Kenyér',
			wallet: 'Készpénz',
			type: 'Kiadás',
			category: 'Bevásárlás',
			subcategory: 'Élelmiszer',
			amount: '320'
		},
		{
			name: 'Tej',
			wallet: 'Készpénz',
			type: 'Kiadás',
			category: 'Bevásárlás',
			subcategory: 'Élelmiszer',
			amount: '260'
		},
		{
			name: 'Fizetés',
			wallet: 'Bankártya1',
			type: 'Bevétel',
			category: 'Havi munkabér',
			subcategory: '',
			amount: '260000'
		}
	];

	ngOnInit() {}
}
