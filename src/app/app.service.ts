import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Weather } from './models/weather.model';
import { Observable } from 'rxjs/Observable';
import { Wind } from './models/wind.model';
import { Atmosphere } from './models/atmosphere.model';
import { CurrentForecast, Forecast } from './models/forecast.model';
import { Location } from './models/location.model';


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
					throw ('City Not Found');
				}
			}),
			map(data => {
				return this.createWeather(data);
			}),
			catchError(error => Observable.throw(error))
		);
	}

	createWeather(data): Weather {
		return {
			location: this.createLocations(data.location),
			wind: this.createWind(data.wind),
			atmosphere: this.createAtmosphere(data.atmosphere),
			forecast: this.createForecast(data.item.forecast),
			current: this.createCurrentForecast(data.item.condition)
		};
	}

	createLocations(location): Location {
		return {
			country: location.country,
			region: location.region,
			city: location.city,
		};
	}

	createWind(wind): Wind {
		return {
			chill: wind.chill,
			speed: wind.speed
		};
	}

	createAtmosphere(atmosphere): Atmosphere {
		return {
			humidity: atmosphere.humidity,
			pressure: atmosphere.pressure,
			visibility: atmosphere.visibility
		};
	}

	createForecast(forecast): Forecast[] {
		return forecast.map((item): Forecast => {
			return {
				date: item.date,
				day: item.day,
				text: item.text,
				high: +item.high,
				low: +item.low,
			};
		});
	}

	createCurrentForecast(current): CurrentForecast {
		return {
			date: current.date,
			temp: current.temp,
			text: current.text,
		};
	}

}
