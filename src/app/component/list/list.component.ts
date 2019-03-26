import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/service/transaction.service';
import { HttpClient } from '@angular/common/http';
import { GridEvent } from 'src/app/type/ag-grid-event.type';

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
			filter: true
		},
		{ headerName: 'Tárca', field: 'wallet', sortable: true, filter: true, resizable: true },
		{ headerName: 'Típus', field: 'type', sortable: true, filter: true, resizable: true },
		{ headerName: 'Kategória', field: 'category', sortable: true, filter: true, resizable: true },
		{ headerName: 'Alkategória', field: 'subcategory', sortable: true, filter: true, resizable: true },
		{ headerName: 'Dátum', field: 'date', sortable: true, filter: true, resizable: true },
		{ headerName: 'Összeg', field: 'amount', sortable: true, filter: true, resizable: true },
		{ headerName: 'Törlés', field: 'delete', checkboxSelection: true, resizable: true }
	];

	ngOnInit() {}

	onGridSizeChanged(params: GridEvent): void {
		params.api.sizeColumnsToFit();
	}

	onSelectionChanged(params: GridEvent): void {
		const selectedRows = params.api.getSelectedRows();
		console.log(selectedRows);
		let selectedRowsString = '';
		selectedRows.forEach(function(selectedRow, index) {
			if (index !== 0) {
				selectedRowsString += ', ';
			}
			selectedRowsString += selectedRow.athlete;
		});
		// document.querySelector('#selectedRows').innerHTML = selectedRowsString;
	}

	gridReady(event: GridEvent): void {}
}
