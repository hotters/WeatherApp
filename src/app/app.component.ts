import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	data: Observable<Object>;

	constructor(
		private service: AppService
	) {}

	ngOnInit() {
		this.data = this.service.getWeather('khabarovsk');
	}
}
