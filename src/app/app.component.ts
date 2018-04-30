import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';

import { ErrorMatcher } from './lib/error-matcher';
import { Location } from './models/location.model';
import { GetWeather } from './store/app.store';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	matcher = new ErrorMatcher();

	@Select(state => state.data.weather && state.data.weather.location)
	location$: Observable<Location>;

	@Select(state => state.data.loading)
	loading$: Observable<boolean>;

	@Select(state => state.data.error)
	error$: Observable<string>;

	cityInput = new FormControl('Khabarovsk', [Validators.required]);

	constructor(private store: Store) {}

	ngOnInit() {
		this.store.subscribe(store =>
			this.cityInput.setErrors(
				store.data.error ? { data: store.data.error } : null
			)
		);
	}

	getWeather(city: string) {
		this.store.dispatch(new GetWeather(city));
	}
}
