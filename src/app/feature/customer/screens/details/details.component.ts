import {Component, Input, OnInit} from '@angular/core';
import { Address } from 'src/app/shared/interfaces/address';
import { Customer } from 'src/app/shared/interfaces/customer';
import { AddressService } from 'src/app/shared/resources/address.service';



@Component({
  selector: 'details-customer',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {

  @Input() customerSelected?: Customer;
  addresses: Address[] = [];

  constructor(private serviceAddress: AddressService){}

  ngOnInit(): void {
    this.serviceAddress.findAllByCustomerId(this.customerSelected!.id)
      .subscribe({
        next: (addresses: Address[]) => { this.addresses = addresses }
      })
  }

  saveAddress(address: Address){
    this.serviceAddress.create(address, this.customerSelected!.id)
      .subscribe({
        next: (value: Address) => { this.addresses.push(value) }
      })
  }
}
