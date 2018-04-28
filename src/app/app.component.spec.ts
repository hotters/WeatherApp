import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngxs/store';


describe('AppComponent', () => {
	let store: Store;
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				AppComponent
			],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
		store = TestBed.get(Store);
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
	});

	xit('should create the app', async(() => {
		expect(component).toBeTruthy();
	}));

	xit(`should have as title 'app'`, async(() => {
		expect(component).toEqual('app');
	}));

	xit('should render title in a h1 tag', async(() => {
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
	}));
});
