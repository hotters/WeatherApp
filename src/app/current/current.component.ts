import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import { Weather } from '../models/weather.model';

@Component({
	selector: 'app-current',
	templateUrl: './current.component.html',
	styleUrls: ['./current.component.scss']
})
export class CurrentComponent {

	@Select((state: { data: { weather: Weather } }) => state.data.weather) weather$: Observable<Weather>;

}
