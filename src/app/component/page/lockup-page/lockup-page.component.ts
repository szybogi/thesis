import { find, map } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LockupFormComponent } from '../../lockup-form/lockup-form.component';
import { DatabaseService } from 'src/app/service/database.service';
import { Lockup } from 'src/app/model/lockup.interface';
import * as moment from 'moment';
import { Transaction } from 'src/app/model/transaction.class';

@Component({
	selector: 'app-lockup-page',
	templateUrl: './lockup-page.component.html',
	styleUrls: ['./lockup-page.component.scss']
})
export class LockupPageComponent implements OnInit {
	constructor(private databaseService: DatabaseService, private formBuilder: FormBuilder) {}

	public lockupForm = this.formBuilder.group({});
	@ViewChild('lockupForm')
	lockupFormComponent: LockupFormComponent;

	ngOnInit() {}

	save() {
		const lockupToSave = this.lockupForm.value.lockup as Lockup;
		const start = moment(lockupToSave.start).unix();
		const end = moment(lockupToSave.start).add(lockupToSave.end, 'month');
		lockupToSave.start = start;
		lockupToSave.end = end.unix();
		const now = moment();
		const diff = now.diff(end, 'days', true);
		if (diff < 0) {
			lockupToSave.status = 'Aktív';
		} else {
			lockupToSave.status = 'Teljesítve';
		}

		this.databaseService.lockupSaver.next(lockupToSave);
		const lockupTransaction: Transaction = {
			id: '',
			name: 'Lekötés kezdete',
			type: 'Kiadás',
			walletRef: lockupToSave.walletRef,
			category: 'Hosszútávú befektetés',
			subcategory: lockupToSave.name,
			amount: lockupToSave.amount,
			date: start,
			transfer: false,
			target: lockupToSave.id
		};
		this.databaseService.transactionsReplayed$
			.pipe(map(t => t.find(t => t.target === lockupTransaction.target)))
			.subscribe(t => {
				if (t) {
					lockupTransaction.id = t.id;
				}
			});
		this.databaseService.transactionSaver.next(lockupTransaction);
		if (diff >= 0) {
			lockupTransaction.name = 'Lekötés teljesítve';
			lockupTransaction.type = 'Bevétel';
			lockupTransaction.date = end.unix();
			lockupTransaction.id = (Number(lockupTransaction.id) + 1).toString();
			lockupTransaction.amount = lockupTransaction.amount * (lockupToSave.interest / 100 + 1);
			this.databaseService.transactionSaver.next(lockupTransaction);
		}
		this.lockupForm.reset();
	}
}
