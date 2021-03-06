import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DatabaseService } from 'src/app/service/database.service';
import { Transaction } from 'src/app/model/transaction.class';

@Component({
	selector: 'app-transaction-delete-renderer',
	templateUrl: './transaction-delete-renderer.component.html',
	styleUrls: ['./transaction-delete-renderer.component.scss']
})
export class TransactionDeleteRendererComponent implements ICellRendererAngularComp {
	constructor(private databaseService: DatabaseService) {}

	public params: any;
	public deletable = true;

	agInit(params: any): void {
		this.params = params;
		if (
			params.data.name === 'Lekötés kezdete' ||
			params.data.name === 'Lekötés feltörés' ||
			params.data.name === 'Lekötés teljesítve'
		) {
			this.deletable = false;
		}
	}

	public delete($event: MouseEvent) {
		$event.stopPropagation();

		this.databaseService.transactionDeleter.next(this.params.data as Transaction);
	}

	refresh(): boolean {
		return false;
	}
}
