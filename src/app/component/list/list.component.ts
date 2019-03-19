import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/service/transaction.service';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	constructor(public transactionService: TransactionService) {}

	columnDefs = [
		{
			headerName: 'Tranzakció neve',
			field: 'name',
			sortable: true,
			filter: true,
			singleClickEdit: true
		},
		{ headerName: 'Tárca', field: 'wallet', sortable: true, filter: true },
		{ headerName: 'Típus', field: 'type', width: 80, sortable: true, filter: true },
		{ headerName: 'Kategória', field: 'category', sortable: true, filter: true },
		{ headerName: 'Alkategória', field: 'subcategory', sortable: true, filter: true },
		{ headerName: 'Dátum', field: 'date', sortable: true, filter: true },
		{ headerName: 'Összeg', field: 'amount', sortable: true, filter: true },
		{ headerName: 'Törlés', field: 'delete', width: 80, checkboxSelection: true }
	];

	rowData = [
		{
			name: 'Kenyér',
			wallet: 'Készpénz',
			type: 'Kiadás',
			category: 'Bevásárlás',
			subcategory: 'Élelmiszer',
			date: new Date().toDateString(),
			amount: '320'
		},
		{
			name: 'Tej',
			wallet: 'Készpénz',
			type: 'Kiadás',
			category: 'Bevásárlás',
			subcategory: 'Élelmiszer',
			date: new Date().toDateString(),
			amount: '260'
		},
		{
			name: 'Fizetés',
			wallet: 'Bankártya1',
			type: 'Bevétel',
			category: 'Havi munkabér',
			subcategory: '',
			date: new Date().toDateString(),
			amount: '260000'
		}
	];

	ngOnInit() {}
}
