import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, EmailValidator } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatabaseService } from 'src/app/service/database.service';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-user-data',
	templateUrl: './user-data.component.html',
	styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
	public dialogForm: FormGroup;
	constructor(
		private fb: FormBuilder,
		public dialogRef: MatDialogRef<UserDataComponent>,
		private databaseService: DatabaseService
	) {}

	ngOnInit() {
		this.dialogForm = this.fb.group({
			name: [this.databaseService.currentUser.getValue(), [Validators.required]],
			email: [this.databaseService.currentEmail.getValue(), [Validators.email]]
		});
	}
	save() {
		this.dialogRef.close(this.dialogForm.value);
	}

	close() {
		this.dialogRef.close();
	}
}
