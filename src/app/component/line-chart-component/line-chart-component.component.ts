import { FinancialStatementPageComponent } from './../page/financial-statement-page/financial-statement-page.component';
import { DatabaseService } from './../../service/database.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-line-chart-component',
	templateUrl: './line-chart-component.component.html',
	styleUrls: ['./line-chart-component.component.scss']
})
export class LineChartComponentComponent implements OnInit {
	public yearForm = this.fb.group({
		year: [
			Number(moment().format('YYYY')),
			[Validators.required, Validators.min(1900), Validators.max(Number(moment().format('YYYY')))]
		]
	});
	public year: string;
	public incomes: number[] = [];
	public spendings: number[] = [];
	public lineChartData: ChartDataSets[] = [
		{ data: this.incomes, label: 'Bevétel' },
		{ data: this.spendings, label: 'Kiadások' }
	];
	public lineChartLabels: Label[] = [
		'Jan',
		'Febr',
		'Márc',
		'Ápr',
		'Máj',
		'Jún',
		'Júl',
		'Aug',
		'Szept',
		'Okt',
		'Nov',
		'Dec'
	];
	public lineChartOptions: ChartOptions & { annotation: any } = {
		responsive: true,
		scales: {
			// We use this empty structure as a placeholder for dynamic theming.
			xAxes: [{}],
			yAxes: [
				{
					id: 'y-axis-0',
					position: 'left'
				},
				{
					id: 'y-axis-1',
					position: 'right',
					gridLines: {
						color: 'rgba(255,0,0,0.3)'
					},
					ticks: {
						fontColor: 'red'
					}
				}
			]
		},
		annotation: {
			annotations: [
				{
					type: 'line',
					mode: 'vertical',
					scaleID: 'x-axis-0',
					value: 'March',
					borderColor: 'orange',
					borderWidth: 2,
					label: {
						enabled: true,
						fontColor: 'orange',
						content: 'LineAnno'
					}
				}
			]
		}
	};
	public lineChartColors: Color[] = [
		{
			// grey
			backgroundColor: 'rgba(148,159,177,0.2)',
			borderColor: 'rgba(148,159,177,1)',
			pointBackgroundColor: 'rgba(148,159,177,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		},
		{
			// red
			backgroundColor: 'rgba(255,0,0,0.3)',
			borderColor: 'red',
			pointBackgroundColor: 'rgba(148,159,177,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		}
	];
	public lineChartLegend = true;
	public lineChartType = 'line';
	public lineChartPlugins = [pluginAnnotations];

	@ViewChild(BaseChartDirective) chart: BaseChartDirective;

	constructor(private databaseService: DatabaseService, private fb: FormBuilder) {}

	ngOnInit() {
		this.year = moment().format('YYYY');
		for (let i = 0; i < 12; i++) {
			this.incomes[i] = 0;
			this.spendings[i] = 0;
		}
		this.getElements();
		for (let j = 0; j < this.lineChartData[0].data.length; j++) {
			this.lineChartData[0].data[j] = this.incomes[j];
			this.lineChartData[1].data[j] = this.spendings[j];
		}

		this.chart.update();
	}

	// events
	public chartClicked({ event, active }: { event: MouseEvent; active: {}[] }): void {
		console.log(event, active);
	}

	public chartHovered({ event, active }: { event: MouseEvent; active: {}[] }): void {
		console.log(event, active);
	}

	public getElements() {
		this.databaseService.incomesReplayed$.pipe().subscribe(transactions => {
			transactions.forEach(t => {
				const date = moment.unix(t.date);
				const year = date.format('YYYY');
				const month = date.format('M');
				if (year === this.year) {
					this.incomes[Number(month)] += t.amount;
				}
			});
		});
		this.databaseService.spendingsReplayed$.pipe().subscribe(transactions => {
			transactions.forEach(t => {
				const date = moment.unix(t.date);
				const year = date.format('YYYY');
				const month = date.format('M');
				if (year === this.year) {
					this.spendings[Number(month)] += t.amount;
				}
			});
		});
	}
	save(): void {
		this.year = this.yearForm.value.year.toString();
		for (let i = 0; i < 12; i++) {
			this.incomes[i] = 0;
			this.spendings[i] = 0;
		}
		this.getElements();
		for (let j = 0; j < this.lineChartData[0].data.length; j++) {
			this.lineChartData[0].data[j] = this.incomes[j];
			this.lineChartData[1].data[j] = this.spendings[j];
		}

		this.chart.update();
	}
}
