/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { AppService } from './app.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Service: App', () => {
	let http: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [AppService]
		});
		http = TestBed.get(HttpTestingController);
	});

	it('Должен обращаться к YAHOO API WEATHER', inject([AppService], (service: AppService) => {
		expect(service.url).toEqual('https://query.yahooapis.com/v1/public/yql?q=');
	}));

});
