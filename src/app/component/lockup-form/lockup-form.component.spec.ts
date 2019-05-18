import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockupFormComponent } from './lockup-form.component';

describe('LockupFormComponent', () => {
  let component: LockupFormComponent;
  let fixture: ComponentFixture<LockupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
