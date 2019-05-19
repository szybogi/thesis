import { DatabaseService } from 'src/app/service/database.service';
import { UserDataComponent } from './../dialog/user-data/user-data.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { User } from 'src/app/model/user.interface';
import { Observable } from 'rxjs';
import { RxDocument } from 'rxdb';
import { map, filter, first } from 'rxjs/operators';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
	public owner: Observable<String>;
	public first = true;

	constructor(
		public dialog: MatDialog,
		private databaseService: DatabaseService,
		private changeDetector: ChangeDetectorRef
	) {
		this.owner = databaseService.user$.pipe(
			filter(u => u !== null),
			map(u => u.name)
		);
	}

	ngOnInit() {
		this.databaseService.user$.pipe().subscribe(user => {
			if (user === null) {
				this.openCashDialog();
			}
		});
	}

	public openCashDialog() {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data = {
			first: this.first
		};
		const dialogRef = this.dialog.open(UserDataComponent);
		const user: User = {
			id: '1',
			name: '',
			email: ''
		};

		dialogRef.afterClosed().subscribe(result => {
			if (result !== undefined) {
				user.name = result.name;
				this.databaseService.userUpdate.next(user);
				this.changeDetector.markForCheck();
			}
			this.first = false;
		});
	}
}
