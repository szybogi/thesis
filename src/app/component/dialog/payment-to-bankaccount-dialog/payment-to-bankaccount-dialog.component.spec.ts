import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentToBankaccountDialogComponent } from './payment-to-bankaccount-dialog.component';

describe('PaymentToBankaccountDialogComponent', () => {
	let component: PaymentToBankaccountDialogComponent;
	let fixture: ComponentFixture<PaymentToBankaccountDialogComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PaymentToBankaccountDialogComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PaymentToBankaccountDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
