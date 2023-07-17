import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCustomerDialogComponent } from './choose-customer-dialog.component';

describe('ChooseCustomerDialogComponent', () => {
  let component: ChooseCustomerDialogComponent;
  let fixture: ComponentFixture<ChooseCustomerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseCustomerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
