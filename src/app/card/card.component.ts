import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import { Forecast } from '../models/forecast.model';
import { Weather } from '../models/weather.model';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.css']
})
export class CardComponent {

	@Select((state: { data: { weather: Weather } }) => state.data.weather && state.data.weather.forecast) forecast$: Observable<Forecast[]>;

}
