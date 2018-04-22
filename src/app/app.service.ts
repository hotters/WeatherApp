import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError, delay } from 'rxjs/operators';

import { Weather } from './models/weather.model';
import { Observable } from 'rxjs/Observable';
import { Wind } from './models/wind.model';
import { Atmosphere } from './models/atmosphere.model';
import { Forecast, CurrentForecast } from './models/forecast.model';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';



@Injectable()
export class AppService {

	url = 'https://query.yahooapis.com/v1/public/yql?q=';

	constructor(
		private http: HttpClient
	) { }

	getWeather(city: string): Observable<Weather | any> {
		return this.http.get<any>(
			this.url +
			`select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${city}") and u="c"&format=json`
		).pipe(
			map(data => {
				if (data && data.query && data.query.results && data.query.results.channel) {
					return data.query.results.channel;
				} else {
					throw(new Error('Data error'));
				}
			}),
			map(data => {
				const wind: Wind = {
					chill: data.wind.chill,
					speed: data.wind.speed
				};
				const atmosphere: Atmosphere = {
					humidity: data.atmosphere.humidity,
					pressure: data.atmosphere.pressure,
					visibility: data.atmosphere.visibility
				};
				const forecast: Forecast[] = [];
				data.item.forecast.forEach(item => {
					const forecastItem: Forecast = {
						date: item.date,
						day: item.day,
						text: item.text,
						high: item.high,
						low: item.low,
					};
					forecast.push(forecastItem);
				});
				const current: CurrentForecast = {
					date: data.item.condition.date,
					temp: data.item.condition.temp,
					text: data.item.condition.text,
				};
				const weather: Weather = {
					wind: wind,
					atmosphere: atmosphere,
					forecast: forecast,
					current: current
				};
				console.log('[SERVICE]', weather);
				return weather;
			}),
			catchError(err => _throw(err)),
		);
	}

}
