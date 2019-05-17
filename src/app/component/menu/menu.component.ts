import { DatabaseService } from 'src/app/service/database.service';
import { UserDataComponent } from './../dialog/user-data/user-data.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { User } from 'src/app/model/user.interface';
import { Observable } from 'rxjs';
import { RxDocument } from 'rxdb';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
	public owner: Observable<RxDocument<User>[]>;

	constructor(public dialog: MatDialog, private databaseService: DatabaseService) {
		this.owner = databaseService.user$;
	}

	ngOnInit() {}

	public openCashDialog() {
		const dialogRef = this.dialog.open(UserDataComponent);
		const user: User = {
			id: '1',
			name: '',
			email: ''
		};

		dialogRef.afterClosed().subscribe(result => {
			if (result !== undefined) {
				user.name = result.name;
				user.email = result.email;
				this.databaseService.userUpdate.next(user);
			}
		});
	}
}
