import { Forecast, CurrentForecast } from './forecast.model';
import { Wind } from './wind.model';
import { Atmosphere } from './atmosphere.model';

export class Weather {
	current: CurrentForecast;
	forecast: Forecast[];
	wind: Wind;
	atmosphere: Atmosphere;
}
