import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProductOrderComponent } from './table-product-order.component';

describe('TableProductOrderComponent', () => {
  let component: TableProductOrderComponent;
  let fixture: ComponentFixture<TableProductOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableProductOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableProductOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
