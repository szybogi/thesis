import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BancAccountFormComponent } from './banc-account-form.component';

describe('BancAccountFormComponent', () => {
	let component: BancAccountFormComponent;
	let fixture: ComponentFixture<BancAccountFormComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BancAccountFormComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BancAccountFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
