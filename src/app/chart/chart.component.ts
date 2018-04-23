import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Select } from '@ngxs/store';
import { Chart } from 'chart.js';
import 'chartjs-plugin-datalabels';
import { Observable } from 'rxjs/Observable';
import { Forecast } from '../models/forecast.model';
import { Weather } from '../models/weather.model';
import { filter, map } from 'rxjs/operators';


@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

	@ViewChild('canvas') canvas: ElementRef;
	chart: any = [];

	@Select((state: { data: { weather: Weather } }) => state.data.weather && state.data.weather.forecast) forecast$: Observable<Forecast[]>;

	constructor() {
	}

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
				console.log('[CHART]', min, max, weatherDates, ctx);
				this.chart = new Chart(ctx, {
					type: 'line',
					data: {
						labels: weatherDates,
						datasets: [
							{
								label: 'Min',
								data: min,
								borderColor: '#36a2eb',
								fill: false
							},
							{
								label: 'Max',
								data: max,
								borderColor: '#ff6384',
								fill: false
							},
						],
					},
					options: {
						legend: {
							display: true
						},
						plugins: {
							datalabels: {
								backgroundColor: context => context.dataset.borderColor,
								borderRadius: 4,
								color: 'white',
								font: {
									weight: 'bold'
								},
								formatter: Math.round
							}
						},
					}
				});
			});

	}

}
