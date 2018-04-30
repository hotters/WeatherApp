import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import { Forecast } from '../models/forecast.model';
import { Weather } from '../models/weather.model';
import { filter, map, tap } from 'rxjs/operators';

@Component({
	selector: 'app-chart',
	template: `
		<ngx-charts-area-chart *ngIf="forecast$ | async"
			[results]="chartData"
			yAxis="true"
			xAxis="true"
			showXAxisLabel="true"
			showYAxisLabel="true"
			yAxisLabel="Temperature"
			xAxisLabel="Date">
		</ngx-charts-area-chart>`,
})
export class ChartComponent implements OnInit {

	@Select(
		(state: { data: { weather: Weather } }) =>
			state.data.weather && state.data.weather.forecast
	)
	forecast$: Observable<Forecast[]>;
	chartData;

	date = Intl.DateTimeFormat('en-gb', { day: '2-digit', month: '2-digit' });

	constructor() { }

	ngOnInit() {
		this.forecast$.pipe(
			filter(data => !!(data && data.length))
		).subscribe(data => {
			this.chartData = this.prepareDataForChart(data);
		});
	}

	prepareDataForChart(data) {
		const low = { name: 'Low', series: [] };
		const high = { name: 'High', series: [] };
		data.forEach(item => {
			const dayAndMonth = this.date.format(new Date(item.date));
			low.series.push({
				name: dayAndMonth,
				value: item.low,
			});
			high.series.push({
				name: dayAndMonth,
				value: item.high,
			});
		});
		return [high, low];
	}
}
