import { Action, Actions, State, StateContext } from '@ngxs/store';
import { Weather } from '../models/weather.model';
import { AppService } from '../app.service';
import { tap } from 'rxjs/operators';


export interface AppStateModel {
	weather: Weather;
	loading: boolean;
	error: any;
}

export class GetWeather {
	static readonly type = '[AppState] Get Weather';

	constructor(public payload: string) {
	}
}

@State<AppStateModel>({
	name: 'data',
	defaults: {
		weather: null,
		loading: false,
		error: null
	}
})
export class AppState {
	constructor(
		private service: AppService,
		private actions$: Actions
	) {
	}

	@Action(GetWeather)
	getWeather({patchState}: StateContext<AppStateModel>, {payload}: GetWeather) {
		patchState({loading: true});
		return this.service.getWeather(payload).pipe(
			tap((result: Weather) => {
					console.log('[NEXT]', result);
					patchState({weather: result, loading: false});
			})
		);
	}

}
