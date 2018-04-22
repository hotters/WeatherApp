import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {

	url = 'https://query.yahooapis.com/v1/public/yql?q=';

	constructor(
		private http: HttpClient
	) { }

	getWeather(city: string) {
		return this.http.get<any>(
			this.url + `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${city}")&format=json`).pipe(
				map(data => data.query.results)
			);
	}

}
