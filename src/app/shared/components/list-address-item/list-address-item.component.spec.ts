import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAddressItemComponent } from './list-address-item.component';

describe('ListAddressItemComponent', () => {
  let component: ListAddressItemComponent;
  let fixture: ComponentFixture<ListAddressItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAddressItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAddressItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
