import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Address } from 'src/app/shared/interfaces/address';
import { Customer } from 'src/app/shared/interfaces/customer';
import { AddressService } from 'src/app/shared/resources/address.service';
import { CustomerService } from 'src/app/shared/resources/customer.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() value: number;
  private customer?: Customer;
  addresses: Address[] = [];
  customersDependents: Customer[] = [];
  addressUnlock: boolean = this.customer ? true : false;
  stepDisabled: boolean = true;
  newButtonDisabled: boolean = true;
  eventsCustomerOpened: Subject<boolean> = new Subject<boolean>();
  eventsCustomerReset: Subject<void> = new Subject<void>();
  eventsAddressOpened: Subject<boolean> = new Subject<boolean>();
  eventsAddressReset: Subject<void> = new Subject<void>();

  constructor(private serviceCustomer: CustomerService,
    private serviceAddress: AddressService){}


  ngOnInit(): void {}

  get customerData(): Customer | undefined {
    return this.customer;
  }

  reset(): void {
    this.customer = undefined;
    this.addresses = [];
    this.customersDependents = [];
    this.eventsCustomerOpened.next(true);
    this.eventsCustomerReset.next();
    this.eventsAddressOpened.next(false);
    this.eventsAddressReset.next();
    this.addressUnlock = false;
    this.stepDisabled = true;
    this.newButtonDisabled = true;
  }

  createCustomer(customer: Customer): void {
    this.serviceCustomer.create(customer)
      .subscribe({
        next: (value: Customer) => {
          this.customer = value;
          this.addressUnlock = true;
          this.eventsCustomerOpened.next(false);
          this.eventsAddressOpened.next(true);
          this.stepDisabled = false;
          this.newButtonDisabled = false;
        },
        error: (e) => console.error(e)
      });
  }

  pushAddress(address: Address): void{
    this.serviceAddress.create(address, this.customer!.id)
        .subscribe({
          next: (value: Address) => this.addresses.push(value)
        });
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
        error: (v) => console.error(v),
      })
  }

  addCustomerDependent(customer: Customer): void{
    this.serviceCustomer.addDependentCustomer(customer, this.customer!.id)
      .subscribe({
        next: (customer: Customer) => {
          this.customersDependents.push(customer);
        }
      })
  }
}
