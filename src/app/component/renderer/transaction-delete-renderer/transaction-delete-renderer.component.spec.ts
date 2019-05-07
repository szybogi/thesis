import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDeleteRendererComponent } from './transaction-delete-renderer.component';

describe('TransactionDeleteRendererComponent', () => {
  let component: TransactionDeleteRendererComponent;
  let fixture: ComponentFixture<TransactionDeleteRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionDeleteRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionDeleteRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
