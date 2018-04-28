import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatInputModule, MatProgressBarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { CardsComponent } from './cards/cards.component';
import { ChartComponent } from './chart/chart.component';
import { CurrentComponent } from './current/current.component';
import { AppState } from './store/app.store';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
	declarations: [
		AppComponent,
		ChartComponent,
		CurrentComponent,
		CardsComponent
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
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
export class AppModule { }
