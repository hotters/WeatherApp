import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { CardComponent } from './card/card.component';
import { environment } from '../environments/environment.prod';

import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';


@NgModule({
	declarations: [
		AppComponent,
		ChartComponent,
		CardComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		ServiceWorkerModule.register('/ngsw-config.json', { enabled: environment.production }),
	],
	providers: [
		AppService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
