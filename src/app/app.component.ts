import { TransactionService } from './service/transaction.service';
import { Component } from '@angular/core';
import { Transaction } from './model/transaction.class';
import * as moment from 'moment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'thesis';
	constructor() {}
}
