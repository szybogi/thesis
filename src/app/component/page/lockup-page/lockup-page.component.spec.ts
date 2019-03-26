import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockupPageComponent } from './lockup-page.component';

describe('LockupPageComponent', () => {
	let component: LockupPageComponent;
	let fixture: ComponentFixture<LockupPageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LockupPageComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LockupPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
