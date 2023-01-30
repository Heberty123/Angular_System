import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address } from '../../interfaces/address';
import { AddressService } from '../../resources/address.service';

@Component({
  selector: 'list-address-item',
  templateUrl: './list-address-item.component.html',
  styleUrls: ['./list-address-item.component.css']
})
export class ListAddressItemComponent {

  @Input() address?: Address;
  @Output() removeEvent = new EventEmitter<number>();

  constructor(){}

  deleteAddress(id: number): void {
    this.removeEvent.emit(id);
  }

  updateAddress(id: number): void {
    console.log("teste: ", id);
  }
}
