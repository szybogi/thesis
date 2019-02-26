import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	constructor(public transactionService: TransactionService) {}

	ngOnInit() {}
}
