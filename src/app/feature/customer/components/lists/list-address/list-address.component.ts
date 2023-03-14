import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Address } from 'src/app/shared/interfaces/address';

@Component({
  selector: 'list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.css']
})
export class ListAddressComponent implements OnInit {

  @Input() addresses: Address[] = [];
  @Output() removeOneAddressFromList = new EventEmitter<number>();

  constructor(){}

  ngOnInit(): void {}

  addressRemoved(id: number): void {
    this.removeOneAddressFromList.emit(id);
  }
}
