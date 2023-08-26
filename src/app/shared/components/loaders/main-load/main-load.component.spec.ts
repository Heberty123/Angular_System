import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLoadComponent } from './main-load.component';

describe('MainLoadComponent', () => {
  let component: MainLoadComponent;
  let fixture: ComponentFixture<MainLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainLoadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
