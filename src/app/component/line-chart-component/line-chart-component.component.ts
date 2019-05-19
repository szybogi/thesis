import { DatabaseService } from './../../service/database.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-line-chart-component',
	templateUrl: './line-chart-component.component.html',
	styleUrls: ['./line-chart-component.component.scss']
})
export class LineChartComponentComponent implements OnInit {
	public incomes: number[] = [];
	public spendings: number[] = [];
	public lineChartData: ChartDataSets[] = [
		{ data: this.incomes, label: 'Bevétel' },
		{ data: this.spendings, label: 'Kiadások' }
	];
	public lineChartLabels: Label[] = [
		'Január',
		'Február',
		'Március',
		'Április',
		'Május',
		'Június',
		'Július',
		'Augusztus',
		'Szeptember',
		'Október',
		'November',
		'December'
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

	constructor(private databaseService: DatabaseService) {}

	ngOnInit() {
		this.getElements();
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
				this.incomes.push(t.amount);
			});
		});
		this.databaseService.spendingsReplayed$.pipe().subscribe(transactions => {
			transactions.forEach(t => {
				this.spendings.push(t.amount);
			});
		});
	}
}
