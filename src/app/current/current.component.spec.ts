/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CurrentComponent } from './current.component';

describe('CurrentComponent', () => {
	let component: CurrentComponent;
	let fixture: ComponentFixture<CurrentComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CurrentComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CurrentComponent);
		component = fixture.componentInstance;
	});

	xit('should create', () => {
		expect(component).toBeTruthy();
	});
});
