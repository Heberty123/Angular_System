import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMatOptionBrandComponent } from './add-mat-option-brand.component';

describe('AddMatOptionBrandComponent', () => {
  let component: AddMatOptionBrandComponent;
  let fixture: ComponentFixture<AddMatOptionBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMatOptionBrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMatOptionBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
