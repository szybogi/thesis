import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataModel } from 'src/app/data/data.model';
import { HttpClient } from '@angular/common/http';
import { find, take, map, tap, flatMap, toArray, mapTo } from 'rxjs/operators';
import * as moment from 'moment';
import { LineChartComponentComponent } from '../../line-chart-component/line-chart-component.component';

@Component({
	selector: 'app-financial-statement-page',
	templateUrl: './financial-statement-page.component.html',
	styleUrls: ['./financial-statement-page.component.scss']
})
export class FinancialStatementPageComponent implements OnInit {
	constructor() {}

	ngOnInit() {}

	save() {
		// this.lineChart.ngOnInit();
	}
}
