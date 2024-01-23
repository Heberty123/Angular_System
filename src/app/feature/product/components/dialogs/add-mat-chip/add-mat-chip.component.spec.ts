import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMatChipComponent } from './add-mat-chip.component';

describe('AddMatChipComponent', () => {
  let component: AddMatChipComponent;
  let fixture: ComponentFixture<AddMatChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMatChipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMatChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
