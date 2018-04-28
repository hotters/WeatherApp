/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardsComponent } from './cards.component';

describe('CardsComponent', () => {
	let component: CardsComponent;
	let fixture: ComponentFixture<CardsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CardsComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CardsComponent);
		component = fixture.componentInstance;
	});

	it('Должен вернуть определенный цвет в hsl формате', () => {
		const temp = 25;
		const testHsl = `hsl(${30 + 240 * (30 - temp) / 60}, 70%, 50%)`;
		const componentHsl = component.setColorOfTemperature(temp);
		console.log(componentHsl, testHsl);
		expect(componentHsl).toEqual(testHsl);
	});
});
