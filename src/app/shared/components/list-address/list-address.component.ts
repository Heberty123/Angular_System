import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address } from '../../interfaces/address';

@Component({
  selector: 'list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.css']
})
export class ListAddressComponent {

  @Input() data: Address[];
  @Input() editable: boolean = false;
  @Output() updateById = new EventEmitter<number>();
  @Output() removeById = new EventEmitter<number>();

  constructor(){}

  deleteItem(id: number): void {
    this.removeById.emit(id);
  }

  updateItem(id: number): void {
    this.updateById.emit(id);
  }
}
