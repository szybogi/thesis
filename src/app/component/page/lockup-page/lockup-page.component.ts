import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LockupFormComponent } from '../../lockup-form/lockup-form.component';
import { DatabaseService } from 'src/app/service/database.service';
import { Lockup } from 'src/app/model/lockup.interface';
import * as moment from 'moment';

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
		lockupToSave.start = moment(this.lockupForm.value.lockup.start).unix();
		lockupToSave.status = 'Aktív';
		// this.databaseService.lockupSaver.next(lockupToSave);
		this.lockupForm.reset();
	}
}
