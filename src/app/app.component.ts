import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs/Observable';
import { Select, Store } from '@ngxs/store';
import { Weather } from './models/weather.model';
import { GetWeather, AppState } from './store/app.store';
import { Wind } from './models/wind.model';
import { Location } from './models/location.model';
import { filter, distinctUntilChanged, map, tap, take, switchMap, first, last, single } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';


export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: null): boolean {
		return !!(control && control.invalid && (control.dirty || control.touched));
	}
}


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	matcher = new MyErrorStateMatcher();

	@Select(state => state.data.weather && state.data.weather.location) location$: Observable<Location>;
	@Select(state => state.data.loading) loading$: Observable<boolean>;
	@Select(state => state.data.error) error$: Observable<string>;

	cityInput = new FormControl(
		'Khabarovsk',
		[Validators.required]
	);

	constructor(
		private store: Store
	) { }

	ngOnInit() {
		this.store.subscribe(store => this.cityInput.setErrors(store.data.error ? { data: store.data.error } : null));
	}

	getWeather(city: string) {
		this.store.dispatch(new GetWeather(city));
	}
}
