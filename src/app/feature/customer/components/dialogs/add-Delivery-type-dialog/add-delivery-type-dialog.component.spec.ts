import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeliveryTypeDialogComponent } from './add-delivery-type-dialog.component';

describe('AddDeliveryTypeDialogComponent', () => {
  let component: AddDeliveryTypeDialogComponent;
  let fixture: ComponentFixture<AddDeliveryTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDeliveryTypeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDeliveryTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
