import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCustomizableComponent } from './input-customizable.component';

describe('InputCustomizableComponent', () => {
  let component: InputCustomizableComponent;
  let fixture: ComponentFixture<InputCustomizableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputCustomizableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputCustomizableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
