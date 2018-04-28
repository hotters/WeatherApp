import { Action, Actions, State, StateContext } from '@ngxs/store';
import { Weather } from '../models/weather.model';
import { AppService } from '../app.service';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';


export interface AppStateModel {
	weather: Weather;
	loading: boolean;
	error: any;
}

export class StateErrorHandler {
	static readonly type = '[AppState] Error Handled';
	constructor(public payload: string) {}
}

export class GetWeather {
	static readonly type = '[AppState] Get Weather';
	constructor(public payload: string) {}
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
	) { }

	@Action(GetWeather)
	getWeather({ patchState, setState, dispatch }: StateContext<AppStateModel>, { payload }: GetWeather) {
		patchState({ loading: true });
		return this.service.getWeather(payload).pipe(
			tap((result: Weather) => {
				setState({ weather: result, loading: false, error: null });
			}, error => {
				dispatch(new StateErrorHandler(error));
			}),
		);
	}

	@Action(StateErrorHandler)
	errorHandler({ setState }: StateContext<AppStateModel>, { payload }: StateErrorHandler) {
		setState({ weather: null, loading: false, error: payload });
	}

}
