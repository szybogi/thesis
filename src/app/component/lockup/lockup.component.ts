import { LockupPageComponent } from './../page/lockup-page/lockup-page.component';
import { RxDocument } from 'rxdb';
import { DatabaseService } from 'src/app/service/database.service';
import { LockupBreakupRendererComponent } from './../renderer/lockup-breakup-renderer/lockup-breakup-renderer.component';
import { Lockup } from 'src/app/model/lockup.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridEvent } from 'src/app/type/ag-grid-event.type';
import * as moment from 'moment';
import { Observable, combineLatest, of } from 'rxjs';
import { map, tap, filter, shareReplay } from 'rxjs/operators';
import { Wallet } from 'src/app/model/wallet.interface';
import { Transaction } from 'src/app/model/transaction.class';
import { BaseDirective } from '../base-directive.class';

@Component({
	selector: 'app-lockup',
	templateUrl: './lockup.component.html',
	styleUrls: ['./lockup.component.scss']
})
export class LockupComponent extends BaseDirective implements OnInit, OnDestroy {
	public columnDefs;
	public rowData;
	public rowSelection;
	public isRowSelectable;
	public frameworkComponents;
	public defaultColDef;
	public gridApi;
	public paginationPageSize;
	public lockupsUpdate$: Observable<Lockup>;
	public lockupsReplayed$: Observable<RxDocument<Lockup>[]>;
	public walletsReplayed$: Observable<RxDocument<Wallet>[]>;
	public transaction: Transaction[];

	constructor(private databaseService: DatabaseService, private lockupPageComponent: LockupPageComponent) {
		super();
		// this.teardown = of().subscribe(); // search ".subscribe("

		this.lockupsUpdate$ = databaseService.lockupsUpdates$.pipe(map(up => up.data.v));
		this.walletsReplayed$ = databaseService.walletsReplayed$;
		this.lockupsReplayed$ = databaseService.lockupsReplayed$;
		this.frameworkComponents = {
			breakupRenderer: LockupBreakupRendererComponent
		};

		this.columnDefs = [
			{
				headerName: 'Megnevezés',
				field: 'name'
			},
			{
				headerName: 'Tárca',
				field: 'walletRef'
			},
			{ headerName: 'Kezdete', field: 'start', valueFormatter: this.dateFormatter },
			{ headerName: 'Vége', field: 'end', valueFormatter: this.dateFormatter, sort: 'desc' },
			{
				headerName: 'Kamat',
				field: 'interest',
				valueFormatter: this.interestFormatter,
				cellStyle: { 'text-align': 'right' }
			},
			{
				headerName: 'Összeg',
				valueFormatter: this.amountFormatter,
				field: 'amount',
				cellStyle: { 'text-align': 'right' }
			},
			{ headerName: 'Státusz', field: 'status' },
			{ headerName: 'Feltörés', field: 'breakUp', filter: false, cellRenderer: 'breakupRenderer' }
		];
		this.paginationPageSize = 10;
		this.defaultColDef = { sortable: true, resizable: true, lockVisible: true, lockPosition: true, filter: true };
		this.rowSelection = 'single';

		this.isRowSelectable = function(rowNode) {
			return rowNode.data ? rowNode.data.status !== 'Feltörve' && rowNode.data.name !== 'Teljesítve' : false;
		};

		combineLatest([this.walletsReplayed$, this.lockupsReplayed$])
			.pipe(
				map(([wallets, lockups]) => {
					return lockups
						.map(l => l.toJSON())
						.map(l => {
							const wallet = wallets.find(w => w.id === l.walletRef);
							if (wallet) {
								l.walletRef = wallet.name;
							} else {
								l.walletRef = 'Készpénz';
							}
							return l;
						});
				})
			)
			.subscribe(lockups => {
				this.rowData = lockups;
			});
	}

	ngOnInit() {}

	amountFormatter(params) {
		return (
			Math.floor(params.value)
				.toString()
				.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' Ft'
		);
	}

	interestFormatter(params) {
		return params.value.toString() + '%';
	}

	dateFormatter(params) {
		return moment.unix(params.value).format('YYYY-MM-DD');
	}

	onGridSizeChanged(params: GridEvent): void {
		params.api.sizeColumnsToFit();
	}

	onSelectionChanged(params: GridEvent): void {
		const selectedRows = params.api.getSelectedRows();
		const selectedLockup = selectedRows.pop();
		const start = moment.unix(selectedLockup.start);
		const end = moment.unix(selectedLockup.end);
		const diff = end.diff(start, 'months', true);

		selectedLockup.start = start.toDate();

		selectedLockup.end = Math.round(diff);
		this.databaseService.walletsReplayed$
			.pipe(
				map(wallets => wallets.find(wallet => wallet.name === selectedLockup.walletRef)),
				tap(wallet => (selectedLockup.walletRef = wallet.id))
			)
			.subscribe();

		this.lockupPageComponent.lockupForm.patchValue({ lockup: selectedLockup });
	}

	gridReady(event: GridEvent): void {
		this.lockupsUpdate$.subscribe(lockup => {
			const now = moment.unix(moment.now());
			const end = moment.unix(lockup.end);
			const diff = now.diff(end, 'days', true);
			console.log('nem megy bele');
			if (lockup.status === 'Aktív' && diff >= 0) {
				console.log('belemegy');
				lockup.status = 'Teljesítve';
			}
			event.api.updateRowData({ update: [lockup] });
		});
	}

	/**
	 * Example on extending the parent ngOnDestroy
	 */
	public ngOnDestroy(): void {
		super.ngOnDestroy();
		console.log('Destroyed!');
	}
}
