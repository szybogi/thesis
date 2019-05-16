import { Component, OnInit } from '@angular/core';
import { GridEvent } from 'src/app/type/ag-grid-event.type';

@Component({
	selector: 'app-lockup',
	templateUrl: './lockup.component.html',
	styleUrls: ['./lockup.component.scss']
})
export class LockupComponent implements OnInit {
	constructor() {}
	columnDefs = [
		{
			headerName: 'Bankszámla',
			field: 'bankaccount',
			sortable: 'true',
			filter: true
		},
		{ headerName: 'Típus', field: 'type', sortable: true, filter: true, resizable: true },
		{ headerName: 'Futamidő', field: 'duration', sortable: true, filter: true, resizable: true },
		{ headerName: 'Kamat', field: 'interest', sortable: true, filter: true, resizable: true },
		{ headerName: 'Kezdete', field: 'start', sortable: true, filter: true, resizable: true },
		{ headerName: 'Vége', field: 'end', sortable: true, filter: true, resizable: true },
		{ headerName: 'Összeg', field: 'amount', sortable: true, filter: true, resizable: true },
		{ headerName: 'Feltörés', field: 'delete', checkboxSelection: true, resizable: true }
	];

	rowData = [
		{
			bankaccount: 'Bankszámla1',
			type: 'egyszeri',
			duration: '2',
			interest: '2%',
			start: '2019-02-01',
			end: '2019-04-01',
			amount: '200000'
		},
		{
			bankaccount: 'Bankszámla1',
			type: 'egyszeri',
			duration: '2',
			interest: '3%',
			start: '2019-02-01',
			end: '2019-04-01',
			amount: '200000'
		}
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
