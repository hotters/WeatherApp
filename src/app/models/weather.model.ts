import { Forecast, CurrentForecast } from './forecast.model';
import { Wind } from './wind.model';
import { Atmosphere } from './atmosphere.model';
import { Location } from './location.model';

export class Weather {
	current: CurrentForecast;
	forecast: Forecast[];
	wind: Wind;
	atmosphere: Atmosphere;
	location: Location;
}
