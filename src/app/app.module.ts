import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { CardComponent } from './card/card.component';

import { AppService } from './app.service';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppState } from './store/app.store';
import { MatInputModule, MatProgressBarModule } from '@angular/material';


@NgModule({
	declarations: [
		AppComponent,
		ChartComponent,
		CardComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		BrowserAnimationsModule,
		// ServiceWorkerModule.register('/ngsw-config.json', { enabled: environment.production }),
		NgxsModule.forRoot([AppState]),
		NgxsReduxDevtoolsPluginModule.forRoot(),
		MatInputModule,
		MatProgressBarModule
	],
	providers: [
		AppService
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
}
