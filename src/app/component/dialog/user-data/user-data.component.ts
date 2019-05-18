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
	public name;
	public email;
	constructor(
		private fb: FormBuilder,
		public dialogRef: MatDialogRef<UserDataComponent>,
		private databaseService: DatabaseService
	) {
		this.databaseService.user$.pipe(map(u => u.name)).subscribe(name => (this.name = name));
		this.databaseService.user$.pipe(map(u => u.email)).subscribe(email => (this.email = email));
	}

	ngOnInit() {
		this.dialogForm = this.fb.group({
			name: [this.name, [Validators.required]],
			email: [this.email, [Validators.email]]
		});
	}
	save() {
		this.dialogRef.close(this.dialogForm.value);
	}

	close() {
		this.dialogRef.close();
	}
}
