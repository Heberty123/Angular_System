import { Component, OnInit } from '@angular/core';
import { delay, map, Observable, Subject, tap } from 'rxjs';
import { Address } from 'src/app/shared/interfaces/address';
import { Customer } from 'src/app/shared/interfaces/customer';
import { AddressService } from 'src/app/shared/resources/address.service';
import { CustomerService } from 'src/app/shared/resources/customer.service';
import { DisableComponentsService } from './services/disable-address.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private customer?: Customer;
  addresses: Address[] = [];
  addressUnlock: boolean = this.customer ? true : false;

  constructor(private serviceCustomer: CustomerService,
    private serviceAddress: AddressService,
    private disableComponents: DisableComponentsService){}

  ngOnInit(): void {}

  get customerData(): Customer | undefined {
    return this.customer;
  }

  createCustomer(customer: Customer): void {
    this.serviceCustomer.create(customer)
      .subscribe({
        next: (value: Customer) => {
          this.customer = value;
          this.disableComponents.customerCreated();
          this.addressUnlock = true; 
        },
        error: (e) => console.error(e)
      });
  }

  pushAddress(address: Address): void{
    this.addresses!.push(address);
  }


  removeAddress(id: number): void{
    this.serviceAddress.deleteById(id)
      .subscribe({
        next: (n: any) => {
          if(n.status == 200){
            this.addresses.filter((value, index) => {
              if(value.id === id){
                this.addresses.splice(index, 1);
              }
            })
          }
        },
        error: (v) => console.log(v),
      })
  }
}
