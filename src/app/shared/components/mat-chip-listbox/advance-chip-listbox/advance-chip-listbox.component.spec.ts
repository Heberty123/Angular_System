import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceChipListboxComponent } from './advance-chip-listbox.component';

describe('AdvanceChipListboxComponent', () => {
  let component: AdvanceChipListboxComponent;
  let fixture: ComponentFixture<AdvanceChipListboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvanceChipListboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvanceChipListboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
