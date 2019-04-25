import { DatabaseService } from './service/database.service';
import { TransactionService } from './service/transaction.service';
import { Component } from '@angular/core';
import { Transaction } from './model/transaction.class';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'thesis';
	constructor(private databaseService: DatabaseService) {}
}
