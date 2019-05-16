import { ColumnApi } from 'ag-grid-community';
import { walletSchema, Wallet } from 'src/app/model/wallet.interface';
import { DatabaseService } from 'src/app/service/database.service';
import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from 'src/app/service/transaction.service';
import { HttpClient } from '@angular/common/http';
import { GridEvent } from 'src/app/type/ag-grid-event.type';
import { Transaction } from 'src/app/model/transaction.class';
import { transition } from '@angular/animations';
import { Observable, combineLatest } from 'rxjs';
import { find, take, map, tap, flatMap, toArray, mapTo } from 'rxjs/operators';
import * as moment from 'moment';
import { NumberFormatStyle, getLocaleNumberFormat } from '@angular/common';
import { RxDocument } from 'rxdb';
import { TransactionPageComponent } from '../page/transaction-page/transaction-page.component';
import { TransactionDeleteRendererComponent } from '../renderer/transaction-delete-renderer/transaction-delete-renderer.component';

@Component({
	selector: 'app-transaction-list',
	templateUrl: './transaction-list.component.html',
	styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
	@Input()
	public transaction: Transaction;

	public transactionsReplayed$: Observable<RxDocument<Transaction>[]>;
	public walletsReplayed$: Observable<RxDocument<Wallet>[]>;
	public transactionsUpdates$: Observable<Transaction>;
	public columnDefs;
	public rowData;
	public rowSelection;
	public frameworkComponents;
	public defaultColDef;
	public gridApi;

	constructor(private databaseService: DatabaseService, private transactionPageComponent: TransactionPageComponent) {
		this.transactionsReplayed$ = databaseService.transactionsReplayed$;
		this.walletsReplayed$ = databaseService.walletsReplayed$;
		this.transactionsUpdates$ = databaseService.transactionsUpdates$.pipe(map(up => up.data.v));

		this.frameworkComponents = {
			deleteRenderer: TransactionDeleteRendererComponent
		};

		this.columnDefs = [
			{
				headerName: 'Tranzakció neve',
				field: 'name'
			},
			{
				headerName: 'Tárca',
				field: 'walletRef'
			},
			{
				headerName: 'Típus',
				field: 'type'
			},
			{
				headerName: 'Kategória',
				field: 'category'
			},
			{
				headerName: 'Alkategória',
				field: 'subcategory'
			},
			{
				filter: true,
				field: 'date',
				headerName: 'Dátum',
				valueFormatter: this.dateFormatter,
				// comparator: this.dateComparator,
				sort: 'desc'
			},
			{
				headerName: 'Összeg',
				valueFormatter: this.amountFormatter,
				field: 'amount',

				cellStyle: { 'text-align': 'right' }
			},
			{
				headerName: 'Törlés',
				field: 'delete',
				cellRenderer: 'deleteRenderer',
				filter: false,
				resizable: false,
				sortable: false
			}
		];

		this.defaultColDef = { sortable: true, resizable: true, lockVisible: true, lockPosition: true, filter: true };

		this.rowSelection = 'single';

		combineLatest([this.walletsReplayed$, this.transactionsReplayed$])
			.pipe(
				map(([wallets, transactions]) => {
					return transactions
						.filter(transaction => !transaction.transfer)
						.map(t => t.toJSON())
						.map(t => {
							// console.log(t);
							const wallet = wallets.find(w => w.id === t.walletRef);
							if (wallet) {
								t.walletRef = wallet.name;
							} else {
								t.walletRef = 'Nem létezik';
							}
							return t;
						});
				})
			)
			.subscribe(transactions => {
				this.rowData = transactions;
			});
	}

	ngOnInit() {}

	dateFormatter(params) {
		return moment.unix(params.value).format('YYYY-MM-DD');
	}

	dateComparator(date1, date2) {
		if (date1 === null && date2 === null) {
			return 0;
		}
		if (date1 === null) {
			return -1;
		}
		if (date2 === null) {
			return 1;
		}
		return date1 - date2;
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
		const selectedTransaction = selectedRows.pop();
		selectedTransaction.date = moment.unix(selectedTransaction.date).toDate();
		this.walletsReplayed$
			.pipe(
				map(wallets => wallets.find(wallet => wallet.name === selectedTransaction.walletRef)),
				tap(wallet => (selectedTransaction.walletRef = wallet.id))
			)
			.subscribe();
		this.transactionPageComponent.transactionForm.patchValue({ transaction: selectedTransaction });
	}

	gridReady(event: GridEvent): void {
		this.transactionsUpdates$.subscribe(transactionsUpdate => {
			event.api.updateRowData({ update: [transactionsUpdate] });
		});
	}
}
