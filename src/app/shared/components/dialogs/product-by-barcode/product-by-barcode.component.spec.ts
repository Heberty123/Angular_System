import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductByBarcodeComponent } from './product-by-barcode.component';

describe('ProductByBarcodeComponent', () => {
  let component: ProductByBarcodeComponent;
  let fixture: ComponentFixture<ProductByBarcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductByBarcodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductByBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
