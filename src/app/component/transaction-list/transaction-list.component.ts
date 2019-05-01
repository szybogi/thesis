import { DatabaseService } from 'src/app/service/database.service';
import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from 'src/app/service/transaction.service';
import { HttpClient } from '@angular/common/http';
import { GridEvent } from 'src/app/type/ag-grid-event.type';
import { Transaction } from 'src/app/model/transaction.class';
import { transition } from '@angular/animations';
import { Observable } from 'rxjs';
import { find, take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { NumberFormatStyle, getLocaleNumberFormat } from '@angular/common';

@Component({
	selector: 'app-transaction-list',
	templateUrl: './transaction-list.component.html',
	styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
	@Input()
	public transaction: Transaction;
	public transactionsReplayed$: Observable<Transaction[]>;
	public transactionsUpdates$: Observable<Transaction>;
	public columnDefs;
	public rowData;

	constructor(private databaseService: DatabaseService) {
		this.transactionsReplayed$ = databaseService.transactionsReplayed$;
		this.transactionsUpdates$ = databaseService.transactionsUpdates$.pipe(map(up => up.data.v));
		this.columnDefs = [
			{
				headerName: 'Tranzakció neve',
				field: 'name',
				sortable: true,
				filter: true,
				lockVisible: true,
				lockPosition: true
			},
			{
				headerName: 'Tárca',
				field: 'wallet',
				sortable: true,
				filter: true,
				resizable: true,
				lockVisible: true,
				lockPosition: true
			},
			{
				headerName: 'Típus',
				field: 'type',
				sortable: true,
				filter: true,
				resizable: true,
				lockVisible: true,
				lockPosition: true
			},
			{
				headerName: 'Kategória',
				field: 'category',
				sortable: true,
				filter: true,
				resizable: true,
				lockVisible: true,
				lockPosition: true
			},
			{
				headerName: 'Alkategória',
				field: 'subcategory',
				sortable: true,
				filter: true,
				resizable: true,
				lockVisible: true,
				lockPosition: true
			},
			{
				headerName: 'Dátum',
				valueFormatter: this.dateFormatter,
				field: 'date',
				sortable: true,
				filter: true,
				resizable: true,
				lockVisible: true,
				lockPosition: true
			},
			{
				headerName: 'Összeg',
				valueFormatter: this.amountFormatter,
				field: 'amount',
				sortable: true,
				filter: true,
				resizable: true,
				lockVisible: true
			}
		];

		this.transactionsReplayed$.pipe().subscribe(transactions => {
			this.rowData = transactions;
		});
	}

	ngOnInit() {}

	dateFormatter(params) {
		return moment.unix(params.value).format('YYYY-MM-DD');
	}

	amountFormatter(params) {
		return (
			Math.floor(params.value)
				.toString()
				.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' Ft'
		);
	}
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

	gridReady(event: GridEvent): void {
		this.transactionsUpdates$.subscribe(transactionsUpdate => {
			event.api.updateRowData({ update: [transactionsUpdate] });
		});
	}
}
