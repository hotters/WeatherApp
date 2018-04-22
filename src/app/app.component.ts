import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs/Observable';
import { Select, Store } from '@ngxs/store';
import { Weather } from './models/weather.model';
import { GetWeather, AppState } from './store/app.store';
import { Wind } from './models/wind.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	@Select(state => state.data.loading) loading$: Observable<boolean>;
	@Select(state => state.data.weather) weather$: Observable<Weather>;

	constructor(
		private store: Store
	) {	}

	ngOnInit() { }

	getWeather(str: string) {
		this.store.dispatch(new GetWeather('khabarovsk'));
	}
}
