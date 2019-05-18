import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockupBreakupRendererComponent } from './lockup-breakup-renderer.component';

describe('LockupBreakupRendererComponent', () => {
	let component: LockupBreakupRendererComponent;
	let fixture: ComponentFixture<LockupBreakupRendererComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LockupBreakupRendererComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LockupBreakupRendererComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
