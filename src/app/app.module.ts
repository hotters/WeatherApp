import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { CardComponent } from './card/card.component';
import { environment } from '../environments/environment.prod';

import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppState } from './store/app.store';


@NgModule({
	declarations: [
		AppComponent,
		ChartComponent,
		CardComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		// ServiceWorkerModule.register('/ngsw-config.json', { enabled: environment.production }),
		NgxsModule.forRoot([AppState]),
		NgxsReduxDevtoolsPluginModule.forRoot(),
	],
	providers: [
		AppService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
