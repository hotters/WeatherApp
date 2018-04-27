import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Weather } from '../models/weather.model';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-cards',
	templateUrl: './cards.component.html',
	styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {

	@Select((state: { data: { weather: Weather } }) => state.data.weather) weather$: Observable<Weather>;

	setColorOfTemperature(temp) {
		return 'hsl(' + 30 + 240 * (30 - +temp) / 60 + ', 70%, 50%)';
	}
}
