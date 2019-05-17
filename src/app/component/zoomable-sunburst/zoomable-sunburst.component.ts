import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';
import { DataModel } from 'src/app/data/data.model';

@Component({
	selector: 'app-zoomable-sunburst',
	templateUrl: './zoomable-sunburst.component.html',
	styleUrls: ['./zoomable-sunburst.component.scss']
})
export class ZoomableSunburstComponent implements OnChanges {
	@ViewChild('chart')
	private chartContainer: ElementRef;

	@Input()
	data: DataModel[];

	margin = { top: 20, right: 20, bottom: 30, left: 40 };

	constructor() {}

	ngOnChanges(): void {
		if (!this.data) {
			return;
		}

		this.createChart();
	}

	onResize() {
		this.createChart();
	}

	private createChart(): void {
		d3.select('svg').remove();

		const element = this.chartContainer.nativeElement;
		const data = this.data;

		const svg = d3
			.select(element)
			.append('svg')
			.attr('width', element.offsetWidth)
			.attr('height', element.offsetHeight);

		const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
		const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

		const x = d3
			.scaleBand()
			.rangeRound([0, contentWidth])
			.padding(0.1)
			.domain(data.map(d => d.letter));

		const y = d3
			.scaleLinear()
			.rangeRound([contentHeight, 0])
			.domain([0, d3.max(data, d => d.frequency)]);

		const g = svg.append('g').attr('transform', `translate(${920 / 2},${920 / 2})`);

		g.selectAll('.circle')
			.data(data)
			.enter()
			.append('rect')

			.attr('class', 'bar')
			.attr('x', d => x(d.letter))
			.attr('y', d => y(d.frequency))
			.attr('width', x.bandwidth())
			.attr('height', d => contentHeight - y(d.frequency));
	}
}
