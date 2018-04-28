import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Select } from '@ngxs/store';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs/Observable';
import { Forecast } from '../models/forecast.model';
import { Weather } from '../models/weather.model';
import { filter, map, tap } from 'rxjs/operators';


@Component({
	selector: 'app-chart',
	template: `
		<div class="canvas">
			<canvas #canvas></canvas>
		</div>`,
})
export class ChartComponent implements OnInit {

	@ViewChild('canvas') canvas: ElementRef;
	@Select((state: { data: { weather: Weather } }) => state.data.weather && state.data.weather.forecast) forecast$: Observable<Forecast[]>;

	chart: Chart;

	constructor() { }

	ngOnInit() {
		this.forecast$.pipe(
			filter((data: any) => data),
			map((data: Forecast[]) => data)
		)
			.subscribe(data => {
				const min = data.map(item => +item.low);
				const max = data.map(item => +item.high);
				const weatherDates = data.map(item => item.day);
				const ctx = this.canvas.nativeElement.getContext('2d');
				this.chart = new Chart(ctx, {
					type: 'bar',
					data: {
						labels: weatherDates,
						datasets: [
							{
								label: 'Min',
								data: min,
								backgroundColor: '#36a2eb',
								fill: false,
								stack: 0
							},
							{
								label: 'Max',
								data: max,
								backgroundColor: '#ff6384',
								fill: false,
								stack: 0
							},
						],
					},
					options: {
						responsive: true,
						hover: {
							mode: 'nearest',
							intersect: true
						},
						tooltips: {
							display: false,
							mode: 'point',
							intersect: false,
						},
						legend: {
							display: true
						},
					}
				});
			});
	}

}
