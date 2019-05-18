import { Lockup } from './../../../model/lockup.interface';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/service/database.service';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Transaction } from 'src/app/model/transaction.class';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
	selector: 'app-lockup-breakup-renderer',
	templateUrl: './lockup-breakup-renderer.component.html',
	styleUrls: ['./lockup-breakup-renderer.component.scss']
})
export class LockupBreakupRendererComponent implements ICellRendererAngularComp {
	constructor(private databaseService: DatabaseService) {}

	public params: any;
	public breakable = true;
	public walletRef;

	agInit(params: any): void {
		this.params = params;
		if (params.data.status === 'Feltörve' || params.data.status === 'Teljesítve') {
			this.breakable = false;
		}
	}

	public breakup($event: MouseEvent) {
		$event.stopPropagation();
		this.params.data.status = 'Feltörve';
		this.databaseService.lockupSaver.next(this.params.data as Lockup);
		this.databaseService.walletsReplayed$
			.pipe(
				map(w => w.find(w => w.name === this.params.data.walletRef)),
				map(w => w.id)
			)
			.subscribe(w => {
				this.walletRef = w;
			});

		const lockupTransaction: Transaction = {
			id: '',
			name: 'Lekötés feltörés',
			type: 'Bevétel',
			walletRef: this.walletRef,
			category: 'Hosszútávú befektetés',
			subcategory: this.params.data.name,
			amount: this.params.data.amount,
			date: moment.now(),
			transfer: false,
			target: ''
		};
		this.databaseService.transactionSaver.next(lockupTransaction);
	}

	refresh(): boolean {
		return false;
	}
}
