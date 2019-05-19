import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataModel } from 'src/app/data/data.model';
import { HttpClient } from '@angular/common/http';
import { find, take, map, tap, flatMap, toArray, mapTo } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
	selector: 'app-financial-statement-page',
	templateUrl: './financial-statement-page.component.html',
	styleUrls: ['./financial-statement-page.component.scss']
})
export class FinancialStatementPageComponent implements OnInit {
	public data: Observable<DataModel>;
	public startDate = moment.unix(moment.now()).year();

	constructor(private http: HttpClient) {
		this.data = this.http.get<DataModel>('./assets/data.json');
	}

	ngOnInit() {}
}
